# Weather Underground Downloader

## Introduction

This project allows a user to download weather data from a specified Weather Underground station to a CSV file in 5 minute intervals for a specified time period.  It relies on the Weather Underground API https://www.wunderground.com/weatherstation/WXDailyHistory.asp?ID=XXXXX&graphspan=day&month=XX&day=XX&year=XXXX&format=1 where X are variables.

Find your desired Weather Station ID at https://www.wunderground.com/wundermap

## Setup

Install nodejs from nodejs.org

Go to this directory and run the command

```sh
npm install
```

## Usage
All functions are contained within wu-download.js.  The required information (Station ID, Start Date, Number of days required) is sent to the program as command line arguments in the format "stationID YYYY MM D N" where YYYY MM D is the start date and N is the number of days of data required. For example:

```sh
node wu-download IHUONVIL2 2019 12 1 5
```

This will give you 5 days of data from 1st December 2019 from the station IHUONVIL2.

The WeatherUnderground API also accepts dates such as 2019-12-40 as equal to 2020-01-09, therefore allowing the program to use 'number of days required' rather than a start and end date.  For example:

```sh
node wu-download IHUONVIL2 2019 12 1 40
```
This will give you data from 1st December 2019 to 9th January 2020 for the station IHUONVIL2.
