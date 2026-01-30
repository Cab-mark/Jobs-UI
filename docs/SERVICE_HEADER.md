# GOV.UK One Login Service Header Integration

## Overview

This application integrates the GOV.UK One Login service header (`@govuk-one-login/service-header`) to provide a consistent navigation experience for all users, with conditional authentication controls based on their login status.

## Features

### Unified Header Design

The application uses a **single header** for both authenticated and unauthenticated users, following the Find an Apprenticeship service pattern:

**Always displayed:**
- GOV.UK One Login branding
- Service name "Civil Service Jobs" (clickable link to homepage)
- Navigation links: "Home" and "View jobs"

**Conditional display based on authentication:**

**When unauthenticated:**
- "Account" toggle button
- "Sign in or create an account" link with One Login icon, linking to `/api/auth/login`

**When authenticated:**
- "One Login" toggle button
- "GOV.UK One Login" link to account management (https://home.account.gov.uk)
- "Sign out" button linking to `/api/auth/logout`

### Progressive Enhancement (SSR)

The header implements progressive enhancement principles:
- Renders immediately on page load (server-side rendering)
- Shows unauthenticated state by default
- Enhances with client-side authentication state after hydration
- No blocking auth check delays or visible content flashing
- Works without JavaScript, then enhances when JavaScript loads

### Authentication State Management

The application uses a React Context (`AuthContext`) to manage user authentication state throughout the application. The context:

- Checks authentication status on app load via `/api/auth/session`
- Provides the authentication state to all components
- Can be used to re-check authentication status when needed

### Sign Out Functionality

The sign out functionality is implemented via the `/api/auth/logout` endpoint which:
1. Retrieves the ID token from the `govuk_id_token` cookie
2. Clears the `govuk_id_token` cookie
3. If `GOVUK_ONELOGIN_LOGOUT_URL` is configured and ID token is present, redirects to the GOV.UK One Login logout endpoint with:
   - `id_token_hint` parameter (required for proper OIDC logout)
   - `post_logout_redirect_uri` parameter
4. Redirects back to the post-logout page (configured via `GOVUK_ONELOGIN_POST_LOGOUT_REDIRECT`)

**Note**: The `id_token_hint` parameter is **required** by GOV.UK One Login for proper logout. Without it, users may remain signed into their GOV.UK One Login account even after clicking "Sign out".

## Configuration

Add the following environment variables to your `.env` file:

```bash
# Optional: GOV.UK One Login logout URL (end session endpoint)
# Example: https://oidc.integration.account.gov.uk/logout
GOVUK_ONELOGIN_LOGOUT_URL=

# Post-logout redirect URL (where to redirect after logout)
GOVUK_ONELOGIN_POST_LOGOUT_REDIRECT=/
```

## Implementation Details

### Components

- **`OneLoginServiceHeader.tsx`**: The unified header component that:
  - Renders for all users with conditional authentication controls
  - Uses progressive enhancement (SSR-friendly)
  - Matches Find an Apprenticeship service pattern
- **`AuthContext.tsx`**: React context provider for managing authentication state
- **`GovukInit.tsx`**: Initializes both GOV.UK Frontend and the One Login service header JavaScript

### API Routes

- **`/api/auth/session`**: Returns the current authentication state (existing)
- **`/api/auth/login`**: Initiates the login flow (existing)
- **`/api/auth/logout`**: Handles logout functionality with proper OIDC end session support

### Styling

The service header styles are imported from `@govuk-one-login/service-header/dist/styles/service-header.css` in `globals.scss`.

### JavaScript Initialization

The service header JavaScript is loaded dynamically in `GovukInit.tsx` to enable the mobile menu toggle functionality.

## Accessibility

The service header follows GOV.UK Design System patterns and meets WCAG 2.1 AA standards:
- Semantic HTML structure
- Proper ARIA labels and roles
- Keyboard navigation support
- Mobile-responsive design with collapsible menu
- Progressive enhancement ensures functionality without JavaScript

## References

- [GOV.UK One Login service header repository](https://github.com/govuk-one-login/service-header)
- [GOV.UK Design System](https://design-system.service.gov.uk/)
- [Service Navigation component](https://design-system.service.gov.uk/components/service-navigation/)
- [OpenID Connect RP-Initiated Logout](https://openid.net/specs/openid-connect-rpinitiated-1_0.html)
