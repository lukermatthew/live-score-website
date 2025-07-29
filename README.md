# Welcome to Live Score Website

Present the data with designs from in the link below, the website should be designed
that its responsive (if the status type for the match is “inprogress” then you should
display an indicator that the match is LIVE and ongoing):

![App Preview](./public/Screenshot%202025-07-29%20at%205.12.56 PM.png)

---

## ✨ Features

The user should also be able to filter the data based on the following filters (you should
show a count of matches per filter) this example shows a single record in the file for an
upcoming match :

ALL -> No Filters, Result => status.type == finished, Live => status.type ==
inprogress, Upcoming => status.type == notstarted
For the filters, you can use any design style you wish as long as the counters are
displayed and the user can easily select the type of filter he/she wishes to see.

---

## 🔧 Tech Stack

- **Next JS** (Functional + Hooks)
- **TypeScript**
- **StyledComponents** or scoped `.css` for styling
- **Vitest, React Testing library**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/lukermatthew/live-score-website.git
cd live-score-website


2. Install Dependencies
npm install


3. Start the Development Server
npm run dev

3. For the testing
npm test
```
