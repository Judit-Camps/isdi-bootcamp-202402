# Final project

## Intro
The main objective of this app is to provide its users with the information of cultural and popular events from organizations and associations. And for organizations to be able to promote their activities

![](https://media.giphy.com/media/bVcpc4QFNUxkOfCw0E/giphy.gif?cid=790b7611pfkhlontxh9tfrgq291f8sldk4ylh5rqejl0ilfb&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional description

### Use cases

- find and list events (by location, type, theme, organization, date)
- view event
- save event
- remove event
- list coming events

- search and list by organizations 
- view organization

- create event (as organization)
- edit event
- delete event

v0.1
- view map
- search and list users
- view user profile
- follow user
- follow organization


### User stories
as organization:
- i can fill a register form (status "registered")
- i can login (when status "accepted" by root) 
- i can create events
- i can see how many times my events have been saved
- i can edit events
- i can delete events
- i can search my events by filters or name


as user:
- i can search for events by theme filters
- i can search for events by location, organization
- i can visualize event information
- i can look at organizations pages


as root:
- i can list registered organization
- i can accept an organization
- i can disable an organization
- i can delete an organization

v.0.1
- i can search for events and organizations by map (location: city | [city, comarca, província])
- i can edit my profile (change information, add links/contact info, add favourite activity themes)
- i can see organizations and other users with similar affinities
- i can follow organizations and users

v.0.2
- generate QR codes for each organization to be scanned
- send notifications/emails when saved event is approaching

### UI design
[Figma](https://www.figma.com/design/ysEOMIDvNCjH4jZNjZeWKx/Untitled?node-id=1-2)

## Technical description

### Modules
- api
- app
- com

### Technologies
- Typescript
- React-native
- Expo
- Express
- Node
- Mongoose
- Mocha / Chai


### Data model

User
- id (auto)
- name (string, required)
- username (string, required)
- password (string, required)
- email (string, required)
- role (string,required, enum: regular| organization|root)
- image (string, optional)
- address (string, optional)
- city (string, optional)
- province(string, optional)
- status (string, enum:inactive|accepted|active, required)
- socialLinks ([string], optional)
- affinities ([string], optional, enum:music|art|sport|...)
- savedEvents ([Event.id], optional)
- followings ([User.id], optional)


Event
- id (auto)
- title (string, required)
- author (User.id, required)
- city (string, required, default:organization city)
- address (string, required, default:organization location)
- date (date, required)
- duration (number, optional)
- description (string, required)
- price (number, required)
- categories ([string], required, enum:music|art|sport|...)
- attendees ([User.id], optional)