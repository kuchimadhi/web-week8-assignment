# SpendWise — Personal Budget & Expense Tracker

SpendWise is a responsive, browser-based personal finance dashboard for recording everyday expenses, setting a monthly spending limit, and understanding where money goes. It is built with plain HTML, CSS, and JavaScript so it can be hosted as a static site.

## Project Description

SpendWise makes personal budgeting approachable. The dashboard summarizes the monthly budget, expenses, and remaining balance. Users can add and remove transactions, categorize purchases, search and filter the transaction list, and update their monthly budget. Data is saved in the browser with localStorage.

## Technologies Used

- HTML5 for accessible page structure and forms
- CSS3 for responsive layout and visual design
- Vanilla JavaScript for expense management and dashboard calculations
- Browser localStorage for saving data on the current device
- Lucide icons and Google Fonts for interface assets
- Git and GitHub for version control
- Netlify for static-site hosting and continuous deployment

## GitHub Repository Information

- Repository: [kuchimadhi/web-week8-assignment](https://github.com/kuchimadhi/web-week8-assignment)
- Visibility: Public
- Default branch: `main`

## Live Netlify Website URL

**Deployment pending:** connect this GitHub repository to Netlify, publish the site, choose a unique SpendWise site name, and replace this line with the verified URL:

`https://YOUR-SPENDWISE-SITE-NAME.netlify.app`

The Netlify URL is intentionally not guessed because the final subdomain is assigned/confirmed in the Netlify account.

## Features

- Monthly budget, total spent, available balance, and remaining budget summaries
- Add expenses with a name, amount, category, and date
- Delete recorded transactions
- Search transactions by name and filter by category
- Category spending breakdown and visual spending chart
- Responsive dashboard for desktop, tablet, and mobile
- Local browser persistence using localStorage
- Sample transactions on first visit to demonstrate the dashboard

## Project Structure

```
web-week8-assignment/
├── index.html       # Dashboard markup
├── style.css        # Responsive styling
├── app.js           # Budget and transaction functionality
├── netlify.toml     # Netlify publish directory and security headers
├── .gitignore
└── README.md
```

## Deployment Process Summary

1. Organize the website files in the repository root. The site is a static website and does not require a build command.
2. Push the project to the public GitHub repository.
3. Sign in to Netlify and choose **Add new site → Import an existing project**.
4. Select GitHub, authorize Netlify if prompted, and choose `kuchimadhi/web-week8-assignment`.
5. Configure the build settings: leave the build command blank and set the publish directory to `.` (the repository root). The included `netlify.toml` also defines this setting.
6. Deploy the site, then use **Site configuration → Domain management → Change site name** to choose an available SpendWise-related `.netlify.app` subdomain.
7. Copy the published URL into the Live Netlify Website URL section above.
8. Test the live site on desktop and mobile. Add a visible text or style update, commit and push it to `main`, then confirm that Netlify starts and completes a new production deploy automatically.

## Continuous Deployment Test

**Visible update prepared:** the dashboard welcome subtitle was updated in a follow-up GitHub commit. Once Netlify is connected to this repository, verify that this commit triggers a production deploy and that the updated subtitle appears on the live site. The automated deploy has not yet been verified.

**Status:** GitHub project files are prepared and pushed. Netlify connection, first production deployment, live URL confirmation, and verification of the automatic deployment test still need to be completed in the Netlify account.

## Challenges Encountered During Deployment

- Connecting a GitHub repository requires granting Netlify access to the correct account and repository.
- Choosing an available custom subdomain may require trying a few project-related names.
- Browser caching can make a recent deployment appear unchanged; a hard refresh helps confirm the latest version.
- The dashboard stores data in localStorage, so transactions are local to the browser/device and are not synchronized across devices.

## Lessons Learned

- A clean project structure and correct publish directory make static-site deployment straightforward.
- Connecting GitHub to Netlify enables continuous deployment after each push to the configured branch.
- A deployment should be tested using its public URL, not only through a local preview.
- Responsive checks, browser-console checks, and asset checks help catch issues before submission.
- Browser localStorage is useful for a lightweight client-side project, but a shared multi-user product would need a backend database and authentication.

## Running Locally

Open `index.html` in a modern browser, or start a local static server from the project folder:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## License

This project is created for educational and portfolio purposes.
