import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor() {}

  /**
   * This function is called after the view has been initialized.
   * It initializes the Google Sign-In API and renders the sign-in button.
   */
  ngAfterViewInit(): void {
    // Initialize the Google Sign-In API with the provided client ID and callback function
    google.accounts.id.initialize({
      client_id: environment.GoogleSignIn.client_ID,
      callback: (response: any) => this.handleGoogleSignIn(response),
    });

    // Render the Google Sign-In button in the specified HTML element
    // with the provided customization attributes
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { size: 'large', type: 'icon', shape: 'pill' } // customization attributes
    );
  }
  /**
   * Handles Google Sign-In response and decodes the ID token to retrieve user details.
   *
   * @param response - The response object from Google Sign-In containing a credential property, which is a JSON Web Token (JWT).
   *
   * This function first logs the `credential` (JWT) token received from Google Sign-In.
   * Then it decodes the ID token, which is in Base64URL format, to access its payload.
   * The payload contains user details such as name, email, and profile image, encoded in JSON.
   *
   * Steps:
   * 1. Extracts the payload section from the JWT token (`response.credential.split('.')[1]`).
   * 2. Converts the Base64URL format into a standard Base64 format.
   * 3. Decodes the Base64 string to retrieve the JSON object containing user information.
   * 4. Logs the parsed JSON object containing user details.
   *
   * Example Usage:
   * ```
   * const googleResponse = { credential: 'eyJhbGciOiJSUzI1NiIsImtpZCI6...'}; // JWT token
   * handleGoogleSignIn(googleResponse);
   * ```
   */
  handleGoogleSignIn(response: any) {
    console.log(response.credential);

    // Decode the ID token to an object if you want to see the details
    let base64Url = response.credential.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    console.log(JSON.parse(jsonPayload));
  }
}
