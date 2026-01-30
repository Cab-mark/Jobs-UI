# GOV.UK One Login Service Header Integration

## Overview

This application integrates the GOV.UK One Login service header (`@govuk-one-login/service-header`) to provide a consistent navigation experience for authenticated users.

## Features

### Dynamic Header Display

The application displays different headers based on authentication state:

**When unauthenticated:**
- Standard GOV.UK header with "Civil Service Jobs" branding
- "Sign in with GOV.UK One Login" button
- Service navigation links (Home, View jobs)

**When authenticated:**
- GOV.UK One Login service header (replaces standard header)
- "GOV.UK One Login" link to account management
- "Sign out" button
- Service name "Civil Service Jobs" displayed in integrated service navigation section

### Authentication State Management

The application uses a React Context (`AuthContext`) to manage user authentication state throughout the application. The context:

- Checks authentication status on app load via `/api/auth/session`
- Provides the authentication state to all components
- Can be used to re-check authentication status when needed

### Sign Out Functionality

The sign out functionality is implemented via the `/api/auth/logout` endpoint which:
1. Clears the `govuk_id_token` cookie
2. If `GOVUK_ONELOGIN_LOGOUT_URL` is configured, redirects to the GOV.UK One Login logout endpoint (to log out of GOV.UK One Login centrally)
3. Redirects back to the post-logout page (configured via `GOVUK_ONELOGIN_POST_LOGOUT_REDIRECT`)

**Note**: If `GOVUK_ONELOGIN_LOGOUT_URL` is not configured, clicking "Sign out" will only clear the local session and will not log the user out of GOV.UK One Login itself.

## Configuration

Add the following environment variables to your `.env` file:

```bash
# Optional: GOV.UK One Login logout URL
GOVUK_ONELOGIN_LOGOUT_URL=

# Post-logout redirect URL (where to redirect after logout)
GOVUK_ONELOGIN_POST_LOGOUT_REDIRECT=/
```

## Implementation Details

### Components

- **`OneLoginServiceHeader.tsx`**: The GOV.UK One Login service header that shows when authenticated, includes both the One Login section and service name
- **`GovukHeader.tsx`**: The standard GOV.UK header that shows when NOT authenticated
- **`ServiceNavigation.tsx`**: Service navigation that shows when NOT authenticated
- **`AuthContext.tsx`**: React context provider for managing authentication state
- **`GovukInit.tsx`**: Initializes both GOV.UK Frontend and the One Login service header JavaScript

### API Routes

- **`/api/auth/session`**: Returns the current authentication state (existing)
- **`/api/auth/logout`**: Handles logout functionality (new)

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

## References

- [GOV.UK One Login service header repository](https://github.com/govuk-one-login/service-header)
- [GOV.UK Design System](https://design-system.service.gov.uk/)
- [Service Navigation component](https://design-system.service.gov.uk/components/service-navigation/)
