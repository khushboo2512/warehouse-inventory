# WarehouseInventory

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Pros and Cons of this project

Pros:
Separation of concerns: The components and services are separate and have distinct responsibilities.
Reusability: The components and services can be reused throughout the application.
Angular's built-in features: Angular provides a lot of built-in features for things like HTTP requests and data binding, making it easy to develop the application.
Cons:
Complexity: Angular can be more complex than other frontend frameworks, for simple applications can consider other light frameworks as well.
Initial setup: The initial setup for an Angular project can take some time, especially if the developer is not familiar with Angular.

## Considerations for Another Iteration

Authentication: Currently, the API does not require authentication. In a real-world application, we would need to add authentication to prevent unauthorized access to the data.
Automated testing: Currently, the code does not have automated tests. In a future iteration, would add tests to ensure the code is working as expected and to make it easier to make changes to the code without introducing bugs.
Loader implementation: Throughout application a loader can be implemented which will be shown until the backend api calls give response.
