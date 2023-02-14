<template>
  <div>
    <app-menu />

    <div class="container my-4">
      <div class="body-heading">
        <h1>Calendar</h1>
        <hr />
      </div>
      <div class="d-flex row">
        <div class="col">
          <div class="mr-auto p-2">
            <h3>{{ this.displayDate }}</h3>
          </div>
          <div class="mr-auto p-2">
            <h3 class="subheading">{{ this.displayDay }}</h3>
          </div>
        </div>
        <div class="p-2">
          <input
            type="date"
            class="form-control"
            @change.prevent="selectedDate"
            value="date"
            id="date-select"
            v-model="select"
          />
        </div>
      </div>

      <div class="calendar">
        <!-- position: relative-->

        <div class="calendar-hours">
          <span class="calendar-hour-value">0</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">1</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">2</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">3</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">4</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">5</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">6</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">7</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">8</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">9</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">10</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">11</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">12</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">13</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">14</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">15</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">16</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">17</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">18</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">19</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">20</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">21</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">22</span>
          <div class="calendar-hour-box"></div>
        </div>
        <div class="calendar-hours">
          <span class="calendar-hour-value">23</span>
          <div class="calendar-hour-box"></div>
        </div>
      </div>

      <div
        class="meeting overflow-auto"
        v-for="calendar in calendars"
        :key="calendar.name"
        :style="{
          height: calculateHeight(calendar) + `px`,
          top: calculateTop(calendar) + `px`,
        }"
      >
        <span class="font-weight-bold">{{ calendar.name }}</span>
        <hr class="m-1" />
        <p>
          <span class="font-weight-bold">Attendees:</span
          ><span v-for="attendee in calendar.attendees" :key="attendee.userId">
            {{ attendee.email }}</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AppMenu from "@/components/AppMenu.vue";
import { getCalendar } from "@/service/calendar";
export default {
  name: "MeetingsCalendar",
  components: {
    // MeetingsCalendar,
    AppMenu,
    // MeetingsList
  },
  data() {
    return {
      displayDay: "",
      select: "",
      displayDate: null,
      calendarDate: new Date(),
      top: null,
      bottom: null,
      height: null,
      calendars: [],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      //loading:false,
      // error: null
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    calculateTop(calendar) {
      //   console.log("Window", window.innerWidth);
      if (this.window.width > 800) {
        const hr = 278 + 60 * calendar.startTime.hours;
        const min = calendar.startTime.minutes * 0.833;
        console.log("top", hr + min);
        return hr + min;
      } else {
        const hr = 310 + 60 * calendar.startTime.hours;
        const min = calendar.startTime.minutes * 0.833;
        console.log("top", hr + min);
        return hr + min;
      }
    },

    calculateHeight(calendar) {
      if (this.window.width > 800) {
        const topHr = 278 + 60 * calendar.startTime.hours;
        const topMin = calendar.startTime.minutes * 0.833;
        const topVal = topHr + topMin;
        const bottomHr = 278 + 60 * calendar.endTime.hours;
        const bottomMin = calendar.endTime.minutes * 0.833;
        const bottomVal = bottomHr + bottomMin;
        const totalHeight = bottomVal - topVal;
        console.log("Height", totalHeight);
        return totalHeight;
      } else {
        const topHr = 310 + 60 * calendar.startTime.hours;
        const topMin = calendar.startTime.minutes * 0.833;
        const topVal = topHr + topMin;
        const bottomHr = 310 + 60 * calendar.endTime.hours;
        const bottomMin = calendar.endTime.minutes * 0.833;
        const bottomVal = bottomHr + bottomMin;
        const totalHeight = bottomVal - topVal;
        console.log("Height", totalHeight);
        return totalHeight;
      }
    },

    //displays left side date
    defaultDateDisplay(dated) {
      const dd = dated.getDate();
      const mm = this.months[dated.getMonth()];
      const yyy = dated.getFullYear();
      const finalDate = `${dd} ${mm} ${yyy}`;
      const day = dated.getDay();
      this.displayDay = this.days[day];
      this.displayDate = finalDate;
    },

    async defaultDate(dated) {
      const d = dated.getDate();
      if (d <= 9) {
        var ddd = `0${d}`;
      } else {
        ddd = d;
      }
      const m = dated.getMonth() + 1;
      if (m <= 9) {
        var mm = `0${m}`;
      } else {
        mm = m;
      }
      const yyy = dated.getFullYear();
      this.select = `${yyy}-${mm}-${ddd}`;
      this.calendars = await getCalendar(this.select);
    },
    //on change for right date
    async selectedDate() {
      console.log(typeof this.select);

      let newDate = new Date(this.select);
      console.log(newDate);
      const d = newDate.getDate();
      if (d <= 9) {
        var dd = `0${d}`;
      } else {
        dd = d;
      }
      console.log(dd);
      const m = newDate.getMonth() + 1;
      if (m <= 9) {
        var mm = `0${m}`;
        //  console.log("executed",ddd);
      } else {
        mm = m;
      }
      const yyy = newDate.getFullYear();
      this.select = `${yyy}-${mm}-${dd}`;
      this.defaultDateDisplay(newDate);
      this.calendars = await getCalendar(this.select);
      //  return finalDate;
    },
  },

  mounted() {
    this.defaultDateDisplay(this.calendarDate);
    this.defaultDate(this.calendarDate);
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
};
</script>

<style scoped>
.calendar {
  position: relative;
}

.calendar-hours {
  display: flex;
  height: 50px;
  margin-bottom: 10px;
}

.calendar-hour-value {
  width: 50px;
}

.calendar-hour-box {
  flex-basis: auto;
  flex-grow: 1;
  background-color: rgb(23, 162, 184);
}
@media only screen and (max-width: 800px) {
  .meeting {
    left: 70px !important;
    right: 20px !important;
  }
}

.meeting {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.733);
  border: 1px solid rgb(164, 161, 161);
  left: 175px;
  right: 125px;
  padding: 5px;
}
.subheading {
  color: rgb(159, 165, 170);
}
</style>