/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['../accUtils', 'knockout', "ojs/ojarraydataprovider", "ojs/ojconverterutils-i18n", "ojs/ojbutton", "ojs/ojradioset", "ojs/ojdatetimepicker", "ojs/ojselectsingle",'ojs/ojvalidationgroup', 'ojs/ojformlayout', 'ojs/ojinputtext', "ojs/ojswitch"],
 function(accUtils, ko, ArrayDataProvider, ojconverterutils_i18n_1) {
    function logViewerViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      this.formValid = ko.observable(true);
      this.faenvmgr = ko.observable(false);
      this.falpg = ko.observable(false);
      this.podmgr = ko.observable(false);
      this.saasmgr = ko.observable(false);
      this.adminVM = ko.observable(false);
      this.podVM = ko.observable(false);
      this.storageVM = ko.observable(false);

      this.info = ko.observable(false);
      this.error = ko.observable(false);
      this.warning = ko.observable(false);

      this.logFilterSelectedVal = ko.observable("five");
      this.logFilterByTime = [
                  { value: "five", label: "Past 5 Minutes" },
                  { value: "fifteen", label: "Past 15 Minutes" },
                  { value: "hour", label: "Past Hour" },
                  { value: "threeHours", label: "Past 3 Hours" },
                  { value: "today", label: "Today" },
                  { value: "date", label: "Date" },
                  { value: "since", label: "Since" },
      ];
      this.logFilterByTimeDP = new ArrayDataProvider(this.logFilterByTime, {
        keyAttributes: "value",
      });


      this.fromValue = ko.observable(ojconverterutils_i18n_1.IntlConverterUtils.dateToLocalIso(new Date(2013, 0, 1)));
      this.toValue = ko.observable(ojconverterutils_i18n_1.IntlConverterUtils.dateToLocalIso(new Date(2013, 0, 1)));


      this.currentZone = ko.observable("pst");
      this.zoneOptions = [
                  { id: "pstoption", value: "pst", zone: "PST" },
                  { id: "utcoption", value: "utc", zone: "UTC" },

      ];

      this.helpAction = (event) => {
        return true;
      };

      this.searchAction = (event) => {
        return true;
      };

      this.clearAction = (event) => {
        return true;
      };
      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      this.connected = () => {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return logViewerViewModel;
  }
);
