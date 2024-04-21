# Final project - app name

## Intro
The main objective of this app provide users of the information of cultural and popular events from organizations and associations.

![](https://media.giphy.com/media/bVcpc4QFNUxkOfCw0E/giphy.gif?cid=790b7611pfkhlontxh9tfrgq291f8sldk4ylh5rqejl0ilfb&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional description

### Use cases

- view map
- find events by location
- search events with filters (by theme)
- search by organization

- save events to user page
- delete events from saved
- view your future activities in a calendar
- look at organizations pages

- create new events (as an organization)
- edit events
- delete events



### UI design
[Figma]()

## Technical description

### Modules
- api
- app
- com

### Technologies

### Data model

Event
- id
- title
- organization (organization name)
- city
- address (organization location) -> can be changed
- date
- time
- description
- price 
- theme
- num of saved times


User
- name
- username
- password
- email
- image (optional)
- affinities (array with options - optional)
- saved events (array with event ids)
- favourited organizations (array with organization ids)
- calendar
- similar users (array with users you have affinity to - by list of favourites)
- contact info & links (optional)


Organization
- id
- name
- code
- city
- address
- email
- description
- events (array with event id)
- contact info & links