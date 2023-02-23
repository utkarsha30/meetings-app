<template>
  <div>
    <hour-glass-loading v-if="loading"></hour-glass-loading>
    <b-card
      v-if="!loading"
      class="extra-css"
      bg-variant="info"
      text-variant="black"
    >
      <b-card-title class="title-font-color">Add a Meeting</b-card-title>
      <hr />
      <div class="card-body">
        <form @submit.prevent="addMeeting">
          <div class="form-group">
            <label for="meetingsName" class="blockquote">Name</label>
            <input
              type="text"
              class="form-control"
              name="meetingsName"
              id="meetingsName"
              placeholder="Name of Meeting"
              v-model="meetingName"
            />
          </div>
          <div class="form-group">
            <label for="meetingsDate" class="blockquote">Date</label>
            <input
              type="date"
              class="form-control"
              id="meetingsDate"
              placeholder="dd/mm/yyyy"
              v-model="meetingDate"
            />
          </div>
          <div class="form-group">
            <label for="meetingsStartTimeHours" class="blockquote"
              >Start time (hh:mm)</label
            >
            <div class="groupElements">
              <input
                type="time"
                id="start-time"
                name="startTime"
                class="time-block"
                v-model="startTime"
                @change="starttimePassed(startTime)"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="meetingsEndTimeHours" class="blockquote"
              >End time (hh:mm)</label
            >
            <div class="groupElements">
              <input
                type="time"
                id="end-time"
                name="endTime"
                class="time-block"
                v-model="endTime"
                @change="endtimePassed(endTime)"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="meetingsDescription" class="blockquote"
              >Description</label
            >
            <textarea
              class="form-control"
              name="meetingsDescription"
              id="meetingsDescription"
              placeholder="What is the agenda of the meeting"
              v-model="meetingDescription"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="meetingsEmail"
              >EmailIDs of attendees , or teams short</label
            >
            <input
              type="text"
              class="form-control"
              id="meetingsEmail"
              aria-describedby="emailHelp"
              placeholder="john@example.com, @annual-day, mark@example.com"
              v-model.trim="meetingAttendee"
            />
            <small id="emailHelp" class="form-text title-font-color"
              >Seperate emailids / short names by commas - team short names
              always begins with @.</small
            >
          </div>
          <button type="submit" class="btn btn-primary">Add a meeting</button>
        </form>
      </div>
    </b-card>
  </div>
</template>

<script >
import { postMeeting } from "@/service/meeting";
import HourGlassLoading from "../HourGlassLoading.vue";
import Vue from "vue";
export default {
  name: "MeetingsAdd",
  components: {
    HourGlassLoading,
  },
  props: {
    updateMeeting: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      context: null,
      meetingDate: null,
      startTime: null,
      endTime: null,
      startTimeHr: 0,
      startTimeMin: 0,
      endTimeHr: 0,
      endTimeMin: 0,
      meetingDescription: null,
      meetingName: null,
      meetingAttendee: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    starttimePassed(time) {
      [this.startTimeHr, this.startTimeMin] = time.split(":");
    },
    endtimePassed(time) {
      [this.endTimeHr, this.endTimeMin] = time.split(":");
    },
    async addMeeting() {
      const arrayAttendees = this.meetingAttendee
        .split(",")
        .map(function (item) {
          return item.trim();
        });

      const obj = {
        name: this.meetingName,
        date: this.meetingDate,
        description: this.meetingDescription,
        startTime: {
          hours: this.startTimeHr,
          minutes: this.startTimeMin,
        },
        endTime: {
          hours: this.endTimeHr,
          minutes: this.endTimeMin,
        },
        attendees: arrayAttendees,
      };
      this.loading = true;

      try {
        const val = await postMeeting(obj);

        Vue.$toast.open({
          message: `Meeting '${val.name}' with id=${val._id} was added`,
          type: "success",
        });
      } catch (error) {
        Vue.$toast.open({
          message: error.message,
          type: "error",
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.time-block {
  margin: 0px auto;
  padding: 9px 1%;
  border: 1px solid rgb(155, 152, 152);
  border-radius: 8px;
  margin-top: 8px;
}
.title-font-color {
  color: white;
}

.groupElements {
  display: block-inline;
}
.custom-select {
  width: 6%;
}
.extra-css {
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
  background-image: linear-gradient(
    to bottom,
    rgb(23, 162, 184),
    rgb(174, 195, 228)
  );
}
</style>