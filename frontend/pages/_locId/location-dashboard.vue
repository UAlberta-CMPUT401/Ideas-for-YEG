<template>
  <v-layout column justify-center align-center>
    <v-card max-width="150%">
      <v-img
        :src="location.imgSrc"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      >
        <h1 class="text-md-center" v-text="location.name"></h1>
        <v-card-title align-center>Moderation Portal</v-card-title>
      </v-img>
    </v-card>
    <v-tabs centered>
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#tab-1"> Subpage Manager </v-tab>
      <v-tab-item eager value="tab-1">
        <SubPageManager v-bind:subpages="subpages" />
      </v-tab-item>
      <v-tab href="#tab-2"> Category Manager </v-tab>
      <v-tab-item eager value="tab-2">
        <CategoryCard v-bind:categories="categories" />
        <form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="20"
            label="Category Name"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          >
          </v-text-field>
          <v-btn
            class="mr-4"
            @click="createCategory(categories, $v.name.$model)"
            >Create</v-btn
          >
        </form>
      </v-tab-item>
      <v-tab href="#tab-3"> Idea Manager </v-tab>
      <v-tab-item eager value="tab-3">
        <v-card-title align-center>
          Idea Management
        </v-card-title>
        <DeleteableIdeaCard v-bind:ideas="ideas" v-bind:location="location" />
      </v-tab-item>
    </v-tabs>
  </v-layout>
</template>

<script src="https://unpkg.com/turndown/dist/turndown.js"></script>
<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import { getJWTCookie } from '../../constants/helperFunctions';
import DeleteableIdeaCard from '../../components/DeleteableIdeaCard';
import CategoryCard from '../../components/CategoryCard';
import SubPageManager from '../../components/SubPageManageCard';
import {
  LS_USER_DATA,
  DEFAULT_LOCATION_IMG_PATH,
  DEFAULT_AVATAR_IMG_PATH,
  DEFAULT_IDEA_IMG_PATH,
} from '../../constants/constants';

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
  },
  components: {
    DeleteableIdeaCard,
    CategoryCard,
    SubPageManager,
  },
  data() {
    /**
     * default user avatar photo: https://medium.com/insider-coub/default-avatars-4275c0e41f62
     * coolidea photo: Photo by Ameen Fahmy on Unsplash https://unsplash.com/photos/_gEKtyIbRSM
     */
    return {
      subpages: {
        pages: [{ title: 'first page', content: 'Empty', updatedAt: '' }],
      },
      name: '',
      ideas: this.$store.getters['ideas/getIdeas'],
      categories: {
        name: 'Calgary',
        id: 'tN',
        category: {
          id: '1',
          name: 'test1',
        },
      },
      location: {
        id: '',
        name: 'Edmonton',
        route: 'TN',
        imgSrc: `${DEFAULT_LOCATION_IMG_PATH}`,
      },
    };
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;

      // Check if the new name already exists as a category
      const categoryList = this._data.categories.category;
      let indexName = -1;
      for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i].name === this.$v.name.$model) {
          indexName = i;
          break;
        }
      }
      !(indexName === -1) && errors.push('Name already exists');
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 10 characters long');
      !this.$v.name.required && errors.push('Name is required.');
      return errors;
    },
  },

  methods: {
    isUpvotedByUser(idea, userId) {
      for (const upvoterId of idea.user_upvoters) {
        if (upvoterId === userId) {
          return true;
        }
      }
      return false;
    },
    // returns true if user already follows that idea
    isFollowedByUser(idea, userId) {
      for (const followerId of idea.followers) {
        if (followerId === userId) {
          return true;
        }
      }
      return false;
    },
    async createCategory(categories, newCategoryName) {
      this.$v.$touch();

      // Revalidate name before submission
      const errors = [];
      const categoryList = this._data.categories.category;
      let indexName = -1;
      for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i].name === this.$v.name.$model) {
          indexName = i;
          break;
        }
      }
      !(indexName === -1) && errors.push('Name already exists');
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 20 characters long');
      !this.$v.name.required && errors.push('Name is required.');
      if (errors.length > 0) return;

      // Get the jwt
      const userJSON = window.localStorage.getItem('userData');
      const userData = JSON.parse(userJSON);

      // Add new name to the category array
      let categoryArray = categories.category;
      categoryArray.push({
        name: newCategoryName,
      });

      // Clear the input fields
      this.$v.$reset();
      this.name = '';

      const config = {
        headers: {
          Authorization: 'Bearer ' + getJWTCookie(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const categoryRequest = {
        category: categoryArray,
      };
      const response = await this.$axios
        .$put(`/categories/${categories.id}`, categoryRequest, config)
        .catch((err) => {
          console.log(err);
        });
    },
  },

  async beforeMount() {
    // Check if user is signed in and a admin role
    if (process.browser) {
      const userJSON = window.localStorage.getItem(LS_USER_DATA);
      if (userJSON !== null) {
        const userData = JSON.parse(userJSON);
        if (userData.user.role.type !== 'authenticated') {
          this.$router.push('/');
        } else {
          const config = {
            headers: {
              Authorization: 'Bearer ' + getJWTCookie(),
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          };

          const adminResponse = await this.$axios
            .get(`/locations/admin`, config)
            .catch((error) => {
              console.log(error);
            });
          if (adminResponse) {
            if (adminResponse.data.managedLocations.length > 0) {
              const locationResponse = await this.$axios
                .get(
                  `/locations/${adminResponse.data.managedLocations[0]}`,
                  config,
                )
                .catch((error) => {
                  console.log(error);
                });

              if (!locationResponse) {
                this.$route.push('/');
              }
            } else {
              this.$router.push('/');
            }
          } else {
            this.$router.push('/');
          }
        }
      } else {
        this.$router.push('/');
      }
    }
  },

  async mounted() {
    const config = {
      headers: {
        Authorization: 'Bearer ' + getJWTCookie(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const subpageResponse = await this.$axios
      .get(`/sub-pages?location.route=${this.$route.params.locId}`, config)
      .catch((error) => {
        console.log(error);
      });
    if (subpageResponse) {
      this.subpages.pages = subpageResponse.data;
    }
    const locationResponse = await this.$axios
      .$get(`/locations?route=${this.$route.params.locId}`, config)
      .catch((error) => {
        console.log(error);
      });

    /**
     * default user avatar photo: https://www.everypixel.com/image-638397625280524203
     * coolidea photo: Photo by Ameen Fahmy on Unsplash https://unsplash.com/photos/_gEKtyIbRSM
     * edmonton skyline https://www.forbes.com/sites/sandramacgregor/2020/01/09/discover-why-edmonton-is-one-of-canadas-hottest-destinations/
     */
    const userJSON = window.localStorage.getItem('userData');
    const userData = JSON.parse(userJSON);
    const params = {
      locId: this.$route.params.locId,
    };
    const ideaResponse = await this.$axios
      .$get(`/ideas?location.route=${this.$route.params.locId}`)
      .catch((err) => {
        console.log(err);
      });
    if (ideaResponse) {
      if (ideaResponse.length > 0) {
        this.ideas = ideaResponse.map((idea, index) => {
          // TODO fix ideacreator and user avatar since API only returns ID
          return {
            id: idea.id.toString(),
            title: idea.title,
            description: idea.description,
            upvotes: idea.upvote_count,
            hasUserUpvoted:
              userData && userData.user && userData.user._id
                ? this.isUpvotedByUser(idea, userData.user._id)
                : false,
            doesUserFollow:
              userData && userData.user && userData.user._id
                ? this.isFollowedByUser(idea, userData.user._id)
                : false,
            ideaCreator: idea.user_creator.username,
            src: idea.images.length
              ? `${this.$axios.defaults.baseURL}${idea.images[0].url}`
              : DEFAULT_IDEA_IMG_PATH,
            volunteers: idea.volunteers.length,
            // TODO fix API to return donated amount
            amountReceived: 100,
            followers: idea.followers.length,
            user_avatar: idea.user_creator.avatar
              ? `${this.$axios.defaults.baseURL}${idea.user_creator.avatar.url}`
              : DEFAULT_AVATAR_IMG_PATH,
            slug: idea.slug,
            featured: idea.featured,
            index,
          };
        });
      }
    }
    if (locationResponse) {
      this.location = {
        id: locationResponse[0].id,
        name: locationResponse[0].name,
        route: locationResponse[0].route,
        imgSrc: locationResponse[0].image.url
          ? `${this.$axios.defaults.baseURL}${locationResponse[0].image.url}`
          : `${DEFAULT_LOCATION_IMG_PATH}`,
      };

      this.categories = {
        id: locationResponse[0].categories.id,
        name: locationResponse[0].categories.name,
        location: {
          id: locationResponse[0].categories.location,
          name: locationResponse[0].name,
        },
        category: locationResponse[0].categories.category,
      };
    }
  },
};
</script>
