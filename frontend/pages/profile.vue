<template>
  <v-layout column justify-center align-center>
    <v-card class="mx-auto" color="#26c6da" dark max-width="700">
      <v-card-title>
        <v-icon large left>
          mdi-account-circle-outline
        </v-icon>
        <span class="title font-weight-light">My Profile</span>
      </v-card-title>
    </v-card>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Ideas I am a Volunteer for:
      </v-card-title>

      <v-card-text>
        <v-simple-table justify="center">
          <template v-slot:default>
            <thead></thead>
            <tbody>
              <tr v-for="idea in ideas">
                <td>{{ idea.title }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      ideas: this.$store.getters['ideas/getIdeas'],
      currentUser: this.$store.getters['users/getUser'],
      isVolunteer: Boolean,
    };
  },

  async mounted() {
    const userJSON = window.localStorage.getItem('userData');
    const userData = JSON.parse(userJSON);
    const config = {
      headers: {
        Authorization: 'Bearer ' + userData.jwt,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const userResponse = await this.$axios
      .get(`/ideas`, config)
      .catch((error) => {
        console.log(error);
      });

    if (userResponse) {
      console.log(userResponse);

      const temp = userResponse.data.map((idea, index) => {
        return {
          id: idea.id.toString(),
          title: idea.title,
          volunteers: idea.volunteers,
        };
      });
      console.log(temp[0].volunteers[0].username);

      //  this.ideas = temp.filter((temp) => temp.volunteers.includes('currentUser.username'),);
      //  const search = currentUser.username;
      //  this.ideas = temp.filter((temp) => temp.volunteers.username.includes('relhajj'), );

      console.log(temp);

      // this.ideas = temp.filter((idea) => idea.volunteers.includes('relhajj'));

      // this.ideas = temp.filter

      this.ideas = temp;

      console.log(this.ideas);

      console.log(userData.user.username); // currentUser username
    }
  },
};
</script>
