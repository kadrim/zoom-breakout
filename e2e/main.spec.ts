import { test, expect } from '@playwright/test';
import { exit } from 'process';

const config = require('../config.json');

if(process.env.DRYRUN != null) {
  console.log('Dryrun enabled, exiting now.');
  exit(0);
}

test.describe('Create Breakout Rooms', async () => {
  test('Actions', async ({ page }) => {
    let meetingId : string = config.meetingId;
    meetingId = meetingId.replace(/\s/g, '');

    await page.goto(`https://zoom.us/wc/join/${meetingId}`);
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('button', { name: 'I Agree' }).click();
    await page.getByLabel('Meeting Passcode').click();
    await page.getByLabel('Meeting Passcode').fill(config.meetingPassword);
    await page.getByLabel('Your Name').click();
    await page.getByLabel('Your Name').fill('zoom-breakout-bot');
    await page.getByRole('button', { name: 'Join', exact: true }).click();
    await page.getByRole('tab', { name: 'Computer Audio' }).click();
    await page.getByLabel('open the participants list pane,[1] particpants').click();
  });
});
