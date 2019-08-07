import { Component } from '@angular/core';
import ical from 'ical';

@Component({
  selector: 'page-cswl',
  templateUrl: 'cswl.html'
})
export class CSWLPage {

    events:any;
    shownGroup:any = null;

    constructor() {



      getEvents().then((data)=> {
        this.events = data;
      });

      function getEvents(){
        return new Promise((resolve) => {
          ical.fromURL('https://cors-anywhere.herokuapp.com/https://ics.teamup.com/feed/ksf4943mrx3wwqp199/0.ics', {}, (err, data) => {
            var list = [];
            for (let k in data) {
          		if (data.hasOwnProperty(k)) {
          			var ev = data[k];
          			if (data[k].type == 'VEVENT') {
                  let eventData = {
                        summary: (ev.summary),
                        location: (ev.location),
                        url:'https://www.cybersecurityweek.lu/events/',
                        date: ev.start.getDate(),
                        start: ev.start,
                        end: ev.end,
                        timeStart: ev.start.getHours() + ":" + ((ev.start.getMinutes() < 10) ? "0"+ ev.start.getMinutes():ev.start.getMinutes()),
                        timeEnd: ev.end.getHours() + ":" + ((ev.end.getMinutes() < 10) ? "0"+ ev.end.getMinutes():ev.end.getMinutes()),
                        allDay: false,
                        difference: 0
                    };


                    if (eventData.timeStart == "0:00" && eventData.timeEnd == "0:00") {
                      eventData.allDay= true;
                      eventData.end.setDate(ev.end.getDate() - 1);
                    }

                    if (ev.end.getDate() - ev.start.getDate() > 0){
                      eventData.difference = ev.end.getDate() - ev.start.getDate();
                    }

                  if (list[eventData.date] === undefined) {
                      list[eventData.date] = [];
                  }
                  if (eventData.difference > 0) {
                  // if (eventData.difference > 0 && eventData.allDay == false ) {
                    for (let i = 0; i <= eventData.difference ; i++) {
                      if (list[eventData.date + i] === undefined) {
                        list[eventData.date + i] = [];
                      }
                      let copyEvent = Object.assign({},eventData);
                      if (!eventData.allDay) {
                        copyEvent.timeEnd  = (i < eventData.difference ? ">>" : eventData.timeEnd);
                        copyEvent.timeStart  = (i == 0 ? eventData.timeStart : ">>");
                        copyEvent.allDay = (copyEvent.timeStart == ">>" && copyEvent.timeEnd  == ">>" ? true : false);
                      }
                      list[eventData.date + i].push(copyEvent);
                    }
                  }else{
                    list[eventData.date].push(eventData);
                  }
                   list[eventData.date].sort(function(a, b) {
                        return a.start.getHours() - b.start.getHours();
                   });
          			}
          		}
          	}
            resolve(list);
          });
        })
      }
    }

    toggleGroup(group) {
      if (this.isGroupShown(group)) {
          this.shownGroup = null;
      } else {
          this.shownGroup = group;
      }
    };

    isGroupShown(group) {
      return this.shownGroup === group;
    };
}
