#!/usr/bin/env python3
"""
DWAPOR E-commerce Backend Testing Suite
Tests backend functionality after color theme changes
"""

import requests
import os
import sys
import json
from datetime import datetime
from pathlib import Path

# Test configuration
FRONTEND_ENV_PATH = "/app/frontend/.env"
BACKEND_ENV_PATH = "/app/backend/.env"

def load_env_vars():
    """Load environment variables from .env files"""
    env_vars = {}
    
    # Load frontend .env
    if os.path.exists(FRONTEND_ENV_PATH):
        with open(FRONTEND_ENV_PATH, 'r') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env_vars[key] = value
    
    # Load backend .env
    if os.path.exists(BACKEND_ENV_PATH):
        with open(BACKEND_ENV_PATH, 'r') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env_vars[key] = value
    
    return env_vars

def test_environment_variables():
    """Test 5: Confirm all required environment variables are properly loaded"""
    print("\n=== TESTING ENVIRONMENT VARIABLES ===")
    
    env_vars = load_env_vars()
    required_vars = ['REACT_APP_BACKEND_URL', 'MONGO_URL', 'DB_NAME']
    
    missing_vars = []
    for var in required_vars:
        if var in env_vars:
            print(f"✅ {var}: {env_vars[var]}")
        else:
            print(f"❌ {var}: MISSING")
            missing_vars.append(var)
    
    if missing_vars:
        print(f"❌ Missing environment variables: {missing_vars}")
        return False
    else:
        print("✅ All required environment variables are present")
        return True

def test_server_status():
    """Test 1: Confirm the FastAPI backend is running properly on port 8001"""
    print("\n=== TESTING SERVER STATUS ===")
    
    env_vars = load_env_vars()
    backend_url = env_vars.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
    
    try:
        # Test root endpoint
        response = requests.get(f"{backend_url}/api/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Server is running at {backend_url}")
            print(f"✅ Root endpoint response: {data}")
            return True
        else:
            print(f"❌ Server responded with status code: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to connect to server: {e}")
        return False

def test_database_connection():
    """Test 2: Verify MongoDB connection is working with MONGO_URL"""
    print("\n=== TESTING DATABASE CONNECTION ===")
    
    env_vars = load_env_vars()
    backend_url = env_vars.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
    
    try:
        # Test database by creating a status check
        test_data = {
            "client_name": f"backend_test_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        }
        
        # Create a status check (this tests database write)
        response = requests.post(f"{backend_url}/api/status", json=test_data, timeout=10)
        if response.status_code == 200:
            created_record = response.json()
            print(f"✅ Database write successful: {created_record['id']}")
            
            # Test database read
            response = requests.get(f"{backend_url}/api/status", timeout=10)
            if response.status_code == 200:
                records = response.json()
                print(f"✅ Database read successful: {len(records)} records found")
                
                # Verify our test record exists
                test_record_found = any(r['client_name'] == test_data['client_name'] for r in records)
                if test_record_found:
                    print("✅ Test record found in database")
                    return True
                else:
                    print("❌ Test record not found in database")
                    return False
            else:
                print(f"❌ Database read failed with status: {response.status_code}")
                return False
        else:
            print(f"❌ Database write failed with status: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Database connection test failed: {e}")
        return False

def test_api_routes():
    """Test 3: Test basic API endpoints"""
    print("\n=== TESTING API ROUTES ===")
    
    env_vars = load_env_vars()
    backend_url = env_vars.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
    
    routes_to_test = [
        ("GET", "/api/", "Root endpoint"),
        ("GET", "/api/status", "Get status checks"),
        ("POST", "/api/status", "Create status check")
    ]
    
    results = []
    
    for method, endpoint, description in routes_to_test:
        try:
            if method == "GET":
                response = requests.get(f"{backend_url}{endpoint}", timeout=10)
            elif method == "POST":
                test_data = {"client_name": f"api_test_{datetime.now().strftime('%H%M%S')}"}
                response = requests.post(f"{backend_url}{endpoint}", json=test_data, timeout=10)
            
            if response.status_code in [200, 201]:
                print(f"✅ {method} {endpoint} - {description}: SUCCESS")
                results.append(True)
            else:
                print(f"❌ {method} {endpoint} - {description}: FAILED (Status: {response.status_code})")
                results.append(False)
                
        except requests.exceptions.RequestException as e:
            print(f"❌ {method} {endpoint} - {description}: ERROR ({e})")
            results.append(False)
    
    return all(results)

def test_static_file_serving():
    """Test 4: Ensure product images and assets are being served correctly"""
    print("\n=== TESTING STATIC FILE SERVING ===")
    
    # Check if product images directory exists
    product_images_dir = Path("/app/frontend/public/products")
    if product_images_dir.exists():
        image_files = list(product_images_dir.glob("*.jpg")) + list(product_images_dir.glob("*.png"))
        print(f"✅ Product images directory exists with {len(image_files)} images")
        
        # List some example images
        for i, img_file in enumerate(image_files[:5]):  # Show first 5 images
            print(f"  - {img_file.name}")
        
        if len(image_files) > 5:
            print(f"  ... and {len(image_files) - 5} more images")
        
        return len(image_files) > 0
    else:
        print("❌ Product images directory not found")
        return False

def test_cors_configuration():
    """Test CORS configuration"""
    print("\n=== TESTING CORS CONFIGURATION ===")
    
    env_vars = load_env_vars()
    backend_url = env_vars.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
    
    try:
        response = requests.options(f"{backend_url}/api/", timeout=10)
        cors_headers = {
            'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
        }
        
        print("✅ CORS headers present:")
        for header, value in cors_headers.items():
            if value:
                print(f"  - {header}: {value}")
        
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ CORS test failed: {e}")
        return False

def main():
    """Run all backend tests"""
    print("🚀 DWAPOR E-commerce Backend Testing Suite")
    print("=" * 50)
    
    test_results = {
        "Environment Variables": test_environment_variables(),
        "Server Status": test_server_status(),
        "Database Connection": test_database_connection(),
        "API Routes": test_api_routes(),
        "Static File Serving": test_static_file_serving(),
        "CORS Configuration": test_cors_configuration()
    }
    
    print("\n" + "=" * 50)
    print("📊 FINAL TEST RESULTS")
    print("=" * 50)
    
    passed = 0
    total = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend tests PASSED! Backend is functioning correctly.")
        return True
    else:
        print("⚠️  Some backend tests FAILED. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)