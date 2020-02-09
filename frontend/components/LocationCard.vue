<template>
  <v-card class="mx-auto">
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="location in locations"
          :key="location.title"
          :cols="location.flex"
        >
          <v-card max-width="150%">
            <NuxtLink :to="location.code + '/idea-dashboard/'">
              <v-img
                :src="location.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="location.title"></v-card-title>
              </v-img>
            </NuxtLink>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    locations: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style scoped></style>
