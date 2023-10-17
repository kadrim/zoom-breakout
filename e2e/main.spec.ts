import { test, expect } from '@playwright/test';
import { exit } from 'process';
import { faker } from '@faker-js/faker';

const config = require('../config.json');
const rooms = [];

config.rooms.forEach(room => {
  if(room.type == 'dynamic') {
    let randomName;
    switch(room.generator) {
      case 'airplane':
        randomName = faker.airline.airplane().name;
        break;
      case 'person':
        randomName = faker.person.fullName();
        break;
      case 'songName':
        randomName = faker.music.songName();
        break;
      default:
        randomName = 'undefined generator';
        break;
    }
    rooms.push(`${room.prefix}${randomName}${room.suffix}`);
  } else {
    rooms.push(room.name);
  }
});

if(process.env.DRYRUN != null) {
  rooms.forEach(room => {
    console.log(`Room-Name: ${room}`);
  });
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
