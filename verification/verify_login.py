from playwright.sync_api import sync_playwright

def verify_login_view():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the login page
        # Note: Vite usually starts on port 5173
        page.goto("http://localhost:5173/login")

        # Wait for the email input to be visible (new field)
        page.wait_for_selector("input[type='email']")

        # Fill in the form
        page.fill("input[type='email']", "test@colossus.tech")
        page.fill("input[type='password']", "password123")

        # Take a screenshot
        page.screenshot(path="verification/login_view.png")

        browser.close()

if __name__ == "__main__":
    verify_login_view()
