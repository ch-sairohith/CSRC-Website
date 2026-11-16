# CSRC Website — maintenance guide

Public website for the Centre for Sponsored Research and Consultancy (CSRC), IIT Tirupati.

The site is a React application. Almost all page content lives in CSV files and a few React components. There is no content-management system and no database. To change what visitors see, edit the file named in this guide, check the site locally, and publish by pushing to the `main` branch.

The Express server only provides a health check and, in production mode, can serve the built files. The live site is the static build published to GitHub Pages. Day-to-day content updates do not require API changes.

## Requirements

- Node.js 20 or newer. The GitHub Actions workflow uses Node.js 22.
- npm (comes with Node.js).

## First-time setup

From the repository root:

```bash
npm install
cp server/.env.example server/.env
npm run dev
```

Open [http://localhost:5173/CSRC-Website/](http://localhost:5173/CSRC-Website/).

The `/CSRC-Website/` prefix is required. It matches `base` in `client/vite.config.js`, which is also the path used on GitHub Pages. Opening `http://localhost:5173/` without that prefix will not load the app.

`npm run dev` starts two processes:

- the React app (Vite) on port 5173
- the API on port 5000

Vite proxies browser requests for `/api` to the API. The only API route today is `GET /api/health`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the API and the React app with hot reload |
| `npm run build` | Builds the client into `client/dist` |
| `npm run preview -w client` | Serves the production build locally. Run `npm run build` first, then open [http://localhost:4173/CSRC-Website/](http://localhost:4173/CSRC-Website/) |
| `npm start` | Starts Express in production mode on port 5000 |

Use `npm run dev` while editing. Use `npm run build` and `npm run preview -w client` before a release if you want to see the same files GitHub Pages will publish.

`npm start` serves `client/dist` from the server root. Because the built pages request assets under `/CSRC-Website/`, that command is not a faithful preview of the published site. Prefer `npm run preview -w client`.

## How publishing works

Pushing to `main` runs `.github/workflows/deploy.yml`. The workflow installs dependencies, runs `npm run build --workspace client`, and deploys `client/dist` to GitHub Pages.

A content change is not visible to the public until that workflow succeeds. In GitHub, open the repository **Actions** tab if a push does not appear on the site.

The Pages site is served from the `/CSRC-Website/` path. If the repository is renamed, or the site is later hosted at the domain root, change `base` in `client/vite.config.js` to the new path (`'/'` for the domain root) and confirm `BrowserRouter` still works. It reads the base from Vite, so no router change is needed after `base` is updated.

## Repository map

```text
client/src/App.jsx                 Routes
client/src/components/             Pages and shared layout
client/src/data/                   CSV content imported by the app
client/src/index.css               All styles
client/public/                     Images and other static files
client/vite.config.js              Dev server, API proxy, public base path
server/src/index.js                Health check and optional static hosting
.github/workflows/deploy.yml       GitHub Pages deployment
```

| Visitor page | Route | Where to edit content |
| --- | --- | --- |
| Home — hero | `/` | `client/src/data/news.csv` and `client/public/HomePageNews/` |
| Home — Director and Dean messages | `/` | `client/src/components/About.jsx` and photos in `client/public/` |
| Home — statistics | `/` | Calculated from the project CSVs. See [Homepage statistics](#homepage-statistics) |
| Home — job ticker | `/` | `client/src/data/project-positions.csv` |
| Home — job list | `/` | `client/src/data/project-positions.csv` |
| Home — News & Events | `/` | `client/src/data/news.csv` |
| Sponsored projects | `/sponsored` | `client/src/data/sponsored-projects.csv` |
| Consultancy projects | `/consultancy` | `client/src/data/consultancy-projects.csv` |
| Grant calls | `/grants` | `client/src/data/grant-calls.csv` |
| Faculty expertise | `/faculty-expertise` | `client/src/data/IIT_Tirupati_*_Faculty.csv` |
| IP and incubation | `/ip` | `client/src/components/IpIncubation.jsx` and the redirect URLs in `client/src/App.jsx` |
| Contacts | `/contacts` | `client/src/components/Contacts.jsx` |
| Research facilities | menu link | External URL in `client/src/components/Header.jsx` |
| Project recruitment | menu link | External URL in `client/src/components/Header.jsx` |

Header, footer, and the announcement bar appear on every page. They are `client/src/components/Header.jsx`, `Footer.jsx`, and `Announcements.jsx`.

## Content updates

After any content edit, save the file and refresh the local site. Vite reloads CSV and component changes. Then commit and push to `main` to publish.

Keep the header row of every CSV exactly as documented below. The app looks up columns by those names. Renaming, reordering carelessly, or deleting a header makes cells blank or breaks a page.

### CSV rules

- Save files as UTF-8.
- The first row is the header. Do not add a title row above it.
- If a value contains a comma, a line break, or a double quote, wrap the whole value in double quotes. A quote inside a quoted value is written twice (`""`).
- Leave a cell empty when the value is unknown. Do not write `N/A` unless that text should appear on the site.
- Do not put spaces in the header names. Spaces inside a data cell are fine.
- Spreadsheet export is safe if the export is CSV and the header row is unchanged. Open the exported file once and confirm the headers still match.

### News, hero, and News & Events

File: `client/src/data/news.csv`

| Column | Used for |
| --- | --- |
| `id` | Stable identifier. Use a new number for each item |
| `title` | Hero heading and News & Events card title. A row with an empty title is ignored |
| `image` | Path under `client/public/`, for example `HomePageNews/photo.jpeg` |
| `link` | Destination of the button. Leave blank when there is no link |
| `button` | Button label. The hero shows a button only when this cell has text. News & Events uses this label, or “View Details” when `link` is set and `button` is empty |
| `body_text` | Paragraph under the hero heading |

Put the image file in `client/public/HomePageNews/`. The CSV path must not start with `public/` or a leading slash. Spaces in the file name are allowed.

The hero shows the first three rows that have a title, in file order, and rotates every 4.5 seconds. News & Events shows every titled row. To feature an item in the hero, move its row into the first three titled rows. To remove it from the hero but keep it in News & Events, move it below those three rows.

A `link` value of `/` or a single space still counts as a link in some views. Leave the cell truly empty when there should be no button.

### Director and Dean messages

File: `client/src/components/About.jsx`

Each card is a photo, a heading, and a paragraph. Replace the paragraph text in place. Photo files:

- Director: `client/public/director-iit-tirupati.jpg`
- Dean (CSRC): `client/public/dean-cif-iit-tirupati.png`

To change a photo, replace the file and keep the same name, or update the `src` in `About.jsx` to the new file name. Use a square crop. The page displays the photo as a circle.

### Homepage statistics

The four figures are not typed in by hand. `client/src/data/loadProjects.js` calculates them when the app builds:

| Figure | Source |
| --- | --- |
| Sponsored Projects | Number of data rows in `sponsored-projects.csv` |
| Sanctioned Amount | Sum of `Project Cost` on those rows, shown in crore |
| MOUs | Sponsored rows whose `MOU/NDA` cell is exactly `MOU` |
| Industry Partners | Number of distinct `Funding Agency` values in `consultancy-projects.csv` |

Update the CSVs and the figures follow. `Project Cost` must be a plain number of rupees, such as `2500000`, not `₹25,00,000`.

### Sponsored projects

File: `client/src/data/sponsored-projects.csv`

The table shows these columns, under shorter labels:

| CSV header | Label on the site |
| --- | --- |
| `Principal Invg` | Principal Investigator |
| `CO PI 1 Inst` | Co-PI |
| `Department` | Department |
| `Proj Title` | Project Title |
| `Financial Year` | Financial Year |
| `Duration of Project(Years)` | Duration |
| `Funding Agency` | Funding Agency |
| `Status` | Status |

These headers are also read but are not separate table columns: `SlNo`, `Proj No.`, `Arear of Research`, `Start Date`, `End Date`, `MOU/NDA`, `Project Cost`. Keep them. `Project Cost` and `MOU/NDA` feed the homepage statistics, and `Proj No.` identifies each row.

`Status` values `Approved`, `Completed`, and `Hold` get a coloured badge. Other statuses still appear, in a neutral badge. Match that capitalisation if you want the colour.

The table shows 20 rows per page. Filters match one column exactly. The page size is `PAGE_SIZE` in `client/src/components/Projects.jsx`.

### Consultancy projects

File: `client/src/data/consultancy-projects.csv`

Visible columns:

| CSV header | Label on the site |
| --- | --- |
| `Principal Invg` | Principal Investigator |
| `CO PI 1 Inst` | Co-PI |
| `Department` | Department |
| `Proj Title` | Project Title |
| `Financial Year` | Financial Year |
| `Duration` | Duration. This cell is generated. See below |
| `Funding Agency` | Funding Agency |
| `Status` | Status |

Do not add a `Duration` column to the CSV. The site builds it from `Start Date` and `End Date`. Both dates must be `DD-MM-YYYY`, for example `01-04-2024`. A missing or impossible date leaves the duration blank.

Other headers to keep: `Consultancy Type`, `Proj No.`, `Type of Consultancy`, `International Project`, `Project Cost Excluding GST`.

Same 20-row pages and exact-match filters as sponsored projects.

### Grant calls

File: `client/src/data/grant-calls.csv`

| Column | Notes |
| --- | --- |
| `id` | Unique on each row. The table uses it as the row identity |
| `Title` | Call name |
| `Funding Agency` | Agency name |
| `Deadline` | Shown as written. There is no date parser |
| `Link` | Full `https://` URL. The table shows it as “View” and opens it in a new tab |

Quote any field that contains a comma. The table shows 20 calls per page.

### Project recruitment and the announcement ticker

File: `client/src/data/project-positions.csv`

| Column | Notes |
| --- | --- |
| `id` | Unique number |
| `advertisementDate` | Stored with the record. Not shown in the current list |
| `position` | Shown as “Positions” |
| `title` | Job title and ticker text |
| `advertisementUrl` | Linked from the title |
| `lastDate` | “Last Date” |
| `extendedDate` | When set, the original last date is struck through and this date is shown as the extension |
| `applyUrl` | Required for the ticker and for the apply button |
| `applyLabel` | Button text. `Apply Now` is shown as “✔ Apply Now” |
| `status` | Optional. Several labels are separated with ` \| ` (space, pipe, space) |
| `statusUrl` | Optional links for those labels, in the same order, also separated with ` \| ` |

Example of two statuses, only the first linked:

```text
Shortlisted | Selected
https://example.com/shortlist.pdf |
```

The home-page ticker lists every row that has both `title` and `applyUrl`. The job list shows 10 rows per page (`PAGE_SIZE` in `client/src/components/JobAnnouncements.jsx`).

Replace any `https://example.com/...` value before publishing. Those addresses are placeholders and should not go on the public site.

The menu item **Project Recruitment** is separate. It opens `https://iittp.ac.in/Project_Positions`, set in `client/src/components/Header.jsx`.

### Faculty expertise

One CSV per department, in `client/src/data/`:

`IIT_Tirupati_Chemical_Faculty.csv`, `IIT_Tirupati_Chemistry_Faculty.csv`, `IIT_Tirupati_Civil_Faculty.csv`, `IIT_Tirupati_CSE_Faculty.csv`, `IIT_Tirupati_Electrical_Faculty.csv`, `IIT_Tirupati_HSS_Faculty.csv`, `IIT_Tirupati_Maths_Stats_Faculty.csv`, `IIT_Tirupati_Mechanical_Faculty.csv`, `IIT_Tirupati_Physics_Faculty.csv`.

Any new file matching `IIT_Tirupati_*_Faculty.csv` in that folder is picked up automatically. No import line has to be added.

Required headers:

```text
S. No.,Department,Faculty Name,Designation,Alma Mater,Area of Interest,WebPage link,Email ID
```

`Areas of Interest` is also accepted in place of `Area of Interest`. `Web Page link` is accepted in place of `WebPage link`. An optional `Image Link` column shows a portrait when the cell is a usable image URL.

A person is omitted when `Faculty Name` is empty. The name links to `WebPage link` when that cell is a URL. Several email addresses in one cell may be separated by a comma, a semicolon, or ` / `. Each address is its own mail link.

The page search matches name, department, and area of interest. Department text should be written the same way for every person in that department, so the suggestions stay clean.

### Contacts

File: `client/src/components/Contacts.jsx`

The directory is the `directory` array. Each entry has `role`, `name`, and `email`. Add or remove an object to change the list. Email addresses become `mailto:` links.

General enquiries, office hours, and location are the three items under that array (`generalEnquiry` and the text in the `contacts-meta` block).

The postal address in the footer is separate. Edit it in `client/src/components/Footer.jsx`.

### IP and incubation

The three cards are the `items` array in `client/src/components/IpIncubation.jsx`. Each card’s button goes to a route in `client/src/App.jsx`, and that route immediately sends the browser to an external PDF or portal:

| Route | Current destination |
| --- | --- |
| `/ip/ipr-policy` | IPR Policy PDF on `files.iittp.ac.in` |
| `/ip/business-incubation-policy` | Business Incubation Policy PDF |
| `/ip/patent-technology-transfer` | Patent and technology transfer page on `iittp.ac.in` |

To point a card at a new document, change the URL in the matching `ExternalRedirect` in `App.jsx`. Keep the route path unless you also change `to` in `IpIncubation.jsx`.

### Menu, footer, and logos

- Menu labels and destinations: `links` in `client/src/components/Header.jsx`. Use `to` for a page in this site and `href` plus `external: true` for another website.
- Footer institute link, internal site link, postal address, and social profile URLs: `client/src/components/Footer.jsx`.
- IIT Tirupati logo: `client/public/iit-tirupati-logo.jpg`
- CSRC logo: `client/public/csrc-logo.png` and `client/public/csrc-logo.svg`
- Browser tab title: `<title>` in `client/index.html`

Research Facilities in the menu opens `https://iittp.ac.in/istem`. The route `/research-facilities` redirects to that same address.

## Changing appearance or behaviour

Styles are in one file, `client/src/index.css`. Colours used across the site are the variables at the top: `--maroon`, `--maroon-deep`, `--gold`, `--navy`, `--ink`, and `--cream`.

Page components are in `client/src/components/`. A new page needs a component and a `<Route>` in `client/src/App.jsx`. Add a menu entry in `Header.jsx` if visitors should be able to open it from the menu.

Table column labels, order, and widths are the `columns` arrays in `client/src/data/loadProjects.js`. Changing a label there does not require a CSV change. Adding a column to the table requires both a CSV header and a new entry in that array. Widths are percentages and should add up to 100 for each table.

Do not commit `node_modules`, `client/dist`, or `server/.env`. Those are already ignored by git.

## Checks before you publish

1. `npm run dev` and walk through the page you changed.
2. For a CSV, confirm the header row is intact and a field that contains a comma is quoted.
3. Click new links. They should open the intended page, PDF, or mail draft.
4. For recruitment rows, confirm `applyUrl` and `advertisementUrl` are real addresses, not `example.com`.
5. For a project import, confirm homepage statistics moved in the way you expect.
6. Push to `main` and wait until the **Deploy to GitHub Pages** workflow is green.

## When something looks wrong

| What you see | What to check |
| --- | --- |
| Local URL shows a blank page | Use `http://localhost:5173/CSRC-Website/`, including the prefix |
| A new CSV column never appears | The header name must match the `key` in `loadProjects.js`, or the faculty header names listed above |
| A whole table cell is empty | The header was renamed, or the value contains a comma and is not quoted, so the columns shifted |
| Consultancy duration is blank | `Start Date` and `End Date` must be `DD-MM-YYYY`, and the end date must be on or after the start date |
| A faculty member is missing | `Faculty Name` is empty, or the file name does not match `IIT_Tirupati_*_Faculty.csv` |
| A job is missing from the ticker | `title` or `applyUrl` is empty |
| A news image is broken | The file is in `client/public/HomePageNews/` and the CSV path matches the file name, including spaces |
| The public site did not change | The push was not to `main`, or the GitHub Pages workflow failed |
| `npm install` fails | Use Node.js 20 or newer, and run the command from the repository root |

`GET http://localhost:5000/api/health` should return `{"ok":true,"service":"csrc-website"}` while `npm run dev` is running. The public pages do not depend on that response.
