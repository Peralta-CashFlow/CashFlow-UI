# CashFlow-UI

This is the React application responsible for all the front-end pages and functionalities of CashFlow, it's hosted on [GitHubPages](https://peralta-cashflow.github.io/CashFlow-UI/) and can be used when all the applications microservices are running.

# Summary

- [Features](#features)
    - [Login](#login)
    - [Register](#register)
    - [Internationalization](#internationalization)
    - [Profile Management](#profile-management)
        - [Personal Information](#personal-information)
        - [Financial Profile](#financial-profile)
        - [Security Information](#security-information)
    - [Category](#category)
        - [Category Registration](#category-registration)
- [Local Used Ports](#local-used-ports)

# Features

## Login

This page comunicates with API-Auth to login with the user informed data.

## Register

This is a modal on login page that comunicates with API-Auth to register a new user with the informed data.

## Internationalization

The system uses [i18next](https://www.i18next.com/) framework to implement internationalizatino on all of the pages and features. 

## Profile Management

This is a modal that can be accessed by clicking on the avatar and selecting settings option.

### Personal Information

A tab inside the profile management modal where you can update your personal information such as: 

- profile picture;
- first name;
- last name;
- tax number;
- birthday;
- gender;

### Financial Profile

A tab inside the profile management modal where you can update your financial information such as:

- occupation;
- monthly income;
- monthly expenses;
- savings goal;

### Security Information

A tab inside the profile management modal where you can update your **password** or **delete** your acocunt.

## Category

This is a page that can be accessed by clicking on the `Register -> Category` menu option.

### Category Registration

On the category page click on the `+ Create Category` button, it will open a modal to register new categories with the bellow information:

- name;
- color;
- emoji;

# Local Used Ports

The CashFlow microservices should be running on specific ports so the app can work correctly being that ports:

- [CashFlow-API-Auth](https://github.com/Peralta-CashFlow/CashFlow-API-Auth): 8090

# Sonar Badges

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Peralta-CashFlow_CashFlow-UI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Peralta-CashFlow_CashFlow-UI)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Peralta-CashFlow_CashFlow-UI&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Peralta-CashFlow_CashFlow-UI)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Peralta-CashFlow_CashFlow-UI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Peralta-CashFlow_CashFlow-UI)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Peralta-CashFlow_CashFlow-UI&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Peralta-CashFlow_CashFlow-UI)

[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-dark.svg)](https://sonarcloud.io/summary/new_code?id=Peralta-CashFlow_CashFlow-UI)