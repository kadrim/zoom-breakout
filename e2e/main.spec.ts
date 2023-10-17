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

    // join the meeting
    await page.goto(`https://zoom.us/wc/join/${meetingId}`);
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('button', { name: 'I Agree' }).click();
    await page.getByLabel('Meeting Passcode').click();
    await page.getByLabel('Meeting Passcode').fill(config.meetingPassword);
    await page.getByLabel('Your Name').click();
    await page.getByLabel('Your Name').fill('zoom-breakout-bot');
    await page.getByRole('button', { name: 'Join', exact: true }).click();

    // claim the host
    await page.getByRole('tab', { name: 'Computer Audio' }).click();
    await page.getByLabel(/open the participants list pane,\[\d+\] particpants/).click();
    await page.getByRole('button', { name: 'Claim Host' }).click();
    await page.getByPlaceholder('Enter 6-10 digit host key').click();
    await page.getByPlaceholder('Enter 6-10 digit host key').fill(config.hostKey);
    await page.getByRole('button', { name: 'Claim Host' }).click();

    // create rooms
    await page.getByLabel('More meeting control').click();
    await page.getByLabel('Breakout Rooms').click();
    await page.getByText('Let participants choose room').click();
    await page.getByLabel('Create  1  breakout rooms').click();
    await page.getByLabel('Create  1  breakout rooms').fill(String(rooms.length));
    await page.getByRole('button', { name: 'Create' }).click();

    // rename rooms
    for(let index = 0; index < rooms.length; index++) {
      const room = rooms[index];
      const oldRoomName = 'Room ' + (index + 1);
      console.log(`Changing Room-Name from ${oldRoomName} to ${room}`);

      await page.getByText(oldRoomName, { exact: true }).click();
      await page.getByRole('button', { name: 'Rename' }).click();
      await page.getByLabel('Breakout Room Name').click();
      await page.getByLabel('Breakout Room Name').press('Shift+Home');
      await page.getByLabel('Breakout Room Name').fill(room);
      await page.getByLabel('Rename', { exact: true }).getByRole('button', { name: 'Rename' }).click();
      await page.keyboard.press('ArrowDown');
    }

    // open all rooms
    await page.getByRole('button', { name: 'Open All Rooms' }).click();
    await page.locator('div').filter({ hasText: /^Breakout Rooms - In Progress$/ }).first().click();
    await page.getByRole('button', { name: 'Close', exact: true }).click();
  
  });
});
