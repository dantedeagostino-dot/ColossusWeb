from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Home Page
        print("Navigating to Home...")
        page.goto("http://localhost:3000")
        page.wait_for_timeout(2000) # Wait for animations
        page.screenshot(path="verification/home.png")
        print("Home screenshot taken.")

        # 2. Verify Navigation to About
        print("Navigating to About...")
        # Click "Quiénes Somos" in the desktop menu (hidden lg:flex gap-8 ...)
        # The menu items are buttons.
        page.get_by_text("Quiénes Somos").click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/about.png")
        print("About screenshot taken.")

        # 3. Verify Lab
        print("Navigating to Lab...")
        page.get_by_text("Laboratorio").click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/lab.png")
        print("Lab screenshot taken.")

        # 4. Verify Library
        print("Navigating to Library...")
        page.get_by_text("Biblioteca").click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/library.png")
        print("Library screenshot taken.")

        # 5. Verify Login Access (Simulated URL)
        print("Navigating to Login...")
        page.goto("http://localhost:3000/login")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/login_page.png")
        print("Login screenshot taken.")

        # 6. Verify Login Action
        print("Attempting login...")
        page.fill("input[type='password']", "colossus2025")
        page.get_by_role("button", name="Ingresar").click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/admin_dashboard.png")
        print("Admin dashboard screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_app()
