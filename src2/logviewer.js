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
define(['../accUtils', 'knockout', "ojs/ojconverter-datetime", "ojs/ojasyncvalidator-regexp", "ojs/ojarraydataprovider", "ojs/ojconverterutils-i18n", "ojs/ojbutton", "ojs/ojradioset", "ojs/ojdatetimepicker", "ojs/ojselectsingle",'ojs/ojvalidationgroup', 'ojs/ojformlayout', 'ojs/ojinputtext', "ojs/ojswitch", "ojs/ojnavigationlist",  "ojs/ojtable"],
 function(accUtils, ko, ojconverter_datetime_1, AsyncRegExpValidator, ArrayDataProvider, ojconverterutils_i18n_1) {
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


      this.fromValue = ko.observable(ojconverterutils_i18n_1.IntlConverterUtils.dateToLocalIso(new Date()));
      this.toValue = ko.observable(ojconverterutils_i18n_1.IntlConverterUtils.dateToLocalIso(new Date()));


      this.currentZone = ko.observable("pst");
      this.zoneOptions = [
                  { id: "pstoption", value: "pst", zone: "PST" },
                  { id: "utcoption", value: "utc", zone: "UTC" },

      ];

      this.helpAction = (event) => {
        return true;
      };

      this.searchAction = (event) => {
        this.formSubmit();
      };

      this.clearAction = (event) => {
        return true;
      };


      // ---------------------- TAB BAR Logic ------------------------------------ //

      this.selectedItem = ko.observable('all');
      this.data = ko.observableArray([{ name: 'All', id: 'all', icons: 'oj-ux-ico-union' }]);
      this.dataProvider = new ArrayDataProvider(this.data, { keyAttributes: 'id' });

      this.updateTabs = (currentSwitch) => {
        //console.log(currentSwitch.target.id);
        if(currentSwitch.target.value == true)
          this.data.push({name: currentSwitch.target.id, id: currentSwitch.target.id, icons: 'oj-ux-ico-union'});
        else {
          /* ES6 feature
          this.indexToRemove = this.data.findIndex(
            (a) => {
              return a.id === currentSwitch.target.id
            }
          ); */
          this.itemToRemove = {name: currentSwitch.target.id, id: currentSwitch.target.id, icons: 'oj-ux-ico-union'};
          this.data.splice(this.data.indexOf(this.itemToRemove), 1);
        }
      }

      // ------------------ For Submission function attached to search button ------------------ //
      // Alternatively $ajax() can be used as well 

      this.formSubmit = async () => {

        const row = {
          info: this.info(),
          error: this.error(),
          warning: this.warning()
        };

        const request = new Request("localhost:9000", {
          headers: new Headers({
            "Content-type": "application/json; charset=UTF-8",
          }),
          body: JSON.stringify(row),
          method: "POST",
        });

        const response = await fetch(request);

        console.log(response);

        return response;

      }


      // this.podmgr.subscribe((currState) => {
      //   if(currState == true)
      //     this.data.push({
      //       name: 'podmgr', id: 'podmgr', icons: 'oj-ux-ico-union'
      //     })
      // })

      // ----------------------------------- Validators -------------------------- //

      this.cimRequestValidator = [
        new AsyncRegExpValidator({
            pattern: 'CIM_[0-9]{5,}#[0-9]',
            hint: 'Enter CIM request pattern e.g. CIM_99869#0',
            messageDetail: 'Enter CIM request pattern e.g. CIM_99869#0'
        })
      ];

      this.fromValue.subscribe((newValue) => { // Also explore peek() in combination with subscribe
        const fromDate = document.getElementById("fromDate");
        //const fromDateValue = fromDate.value;
        const currentDate = ojconverterutils_i18n_1.IntlConverterUtils.dateToLocalIso(new Date());
        const dateTimeUtils = new ojconverter_datetime_1.IntlDateTimeConverter();
        const selectedDate = new Date(newValue);
        const toDay = new Date();
        if(dateTimeUtils.compareISODates(newValue, currentDate) < 0)
          console.log((toDay - selectedDate)/(1000*60*60*24));
        else
          console.log("Date not OK");
      });

      this.dateValidator = {
        validate: (value) => {
          const selectedDate = new Date(value);
          const toDay = new Date();
          if((toDay - selectedDate)/(1000*60*60*24) < 14)
            return;
          else
            throw new Error('Date cannot be older than 14 days')
          return;
        }
      }

      // --------------------------- Table Logic ------------------------ //


      this.downloadAction = (event) => {
        return true;
      };

      this.addFilterAction = (event) => {
        return true;
      };

      this.addColumnAction = (event) => {
        return true;
      };

      this.tableData = [
        {timeStamp: new Date(2023, 1, 1), logMessage: "Dummy message 1"},
        {timeStamp: new Date(2023, 1, 2), logMessage: "Dummy message 2"},
      ]
      this.columns = ko.observableArray([
        { headerText: 'Time Stamp', field: 'timeStamp', id: 'timeStamp' },
        { headerText: 'Message', field: 'logMessage', id: 'logMessage' }
      ]);
      this.dataprovider = new ArrayDataProvider(this.tableData, {
          keyAttributes: 'timeStamp'
      });

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
