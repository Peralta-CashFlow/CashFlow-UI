# CashFlow-UI

This is the React application responsible for all the front-end pages and functionalities of CashFlow, it's hosted on [GitHubPages](https://peralta-cashflow.github.io/CashFlow-UI/) and can be used when all the applications microservices are running.

# Summary

- [Features](#features)
    - [Login](#login)
    - [Register](#register)
    - [Internationalization](#internationalization)
- [Local Used Ports](#local-used-ports)

# Features

## Login

This page comunicates with API-Auth to login with the user informed data.

## Register

This is a modal on login page that comunicates with API-Auth to register a new user with the informed data.

## Internationalization

The system uses [i18next](https://www.i18next.com/) framework to implement internationalizatino on all of the pages and features. 

# Local Used Ports

The CashFlow microservices should be running on specific ports so the app can work correctly being that ports:

- [CashFlow-API-Auth](https://github.com/Peralta-CashFlow/CashFlow-API-Auth): 8090

# Sonar Badges

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Peralta-CashFlow_CashFlow-UI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Peralta-CashFlow_CashFlow-UI)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Peralta-CashFlow_CashFlow-UI&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Peralta-CashFlow_CashFlow-UI)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Peralta-CashFlow_CashFlow-UI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Peralta-CashFlow_CashFlow-UI)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Peralta-CashFlow_CashFlow-UI&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Peralta-CashFlow_CashFlow-UI)

[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-dark.svg)](https://sonarcloud.io/summary/new_code?id=Peralta-CashFlow_CashFlow-UI)