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
    <v-card-title align-center>
      Category Management
    </v-card-title>
    <v-flex xs12 sm8 md6 color="#bdbdbd">
      <CategoryCard v-bind:categories="categories" />
      <form>
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="10"
          label="Category Name"
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        >
        </v-text-field>
        <v-btn class="mr-4" @click="createCategory(categories, $v.name.$model)"
          >Create</v-btn
        >
      </form>
    </v-flex>
    <v-card-title align-center>
      Idea Management
    </v-card-title>
    <v-flex xs12 sm8 md6>
      <DeleteableIdeaCard v-bind:ideas="ideas" v-bind:location="location" />
    </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import DeleteableIdeaCard from '../../components/DeleteableIdeaCard';
import CategoryCard from '../../components/CategoryCard';
import { LS_USER_DATA } from '../../constants/constants';

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
  },
  components: {
    DeleteableIdeaCard,
    CategoryCard,
  },
  data() {
    // TODO: use this.$route.params.locId to get information about the given location
    /**
     * coolidea photo: Photo by Ameen Fahmy on Unsplash https://unsplash.com/photos/_gEKtyIbRSM
     */
    return {
      name: '',
      ideas: this.$store.getters['ideas/getIdeas'],
      categories: {
        name: 'testName',
        id: 'tN',
        category: {
          id: '1',
          name: 'test1',
        },
      },
      location: {
        id: '',
        name: 'testName',
        route: 'TN',
        imgSrc:
          'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
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
        errors.push('Name must be at most 10 characters long');
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

      // Format the JSON for insertion into the graphql
      categoryArray = JSON.stringify(categoryArray);
      categoryArray.replace(/\\"/g, '\uFFFF');
      categoryArray = categoryArray
        .replace(/\"([^"]+)\":/g, '$1:') // eslint-disable-line
        .replace(/\uFFFF/g, '\\"');

      // Clear the input fields
      this.$v.$reset();
      this.name = '';

      // Send graphql post
      const response = await this.$axios
        .$post(
          '/graphql',
          {
            query: `mutation {
              updateCategory(
                input: {
                  where: { id: "${categories.location.id}" }
                  data: {
                    name: "${categories.name}",
                    location: "${categories.location.id}",
                    category: ${categoryArray},
                  }
              })
              {
                category {
                  name
                  location {
                    id
                    name
                  }
                  category {
                    name
                    id
                  }
                }
              }
            }
          `,
          },
          {
            headers: {
              Authorization: 'Bearer ' + userData.jwt,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        )
        .catch((err) => {
          console.log(err.response);
        });
      if (response) {
        console.log(response);
      }
    },
  },

  beforeMount() {
    // Check if user is signed in and a admin role
    if (process.browser) {
      const userJSON = window.localStorage.getItem(LS_USER_DATA);
      if (userJSON !== null) {
        const userData = JSON.parse(userJSON);
        if (userData.user.role.type !== 'authenticated') {
          this.$route.push('/');
        }
      } else {
        this.$router.push('/');
      }
    }
  },

  async mounted() {
    const response = await this.$axios
      .$post('/graphql', {
        query: `query {
            locations(where: { route: "${this.$route.params.locId}" }) {
              id
              name
              route
              image {
                url
              }
              ideas {
                id
                title
                description
                volunteers {
                  username
                }
                images {
                  url
                }
                user_creator {
                  username
                  avatar {
                    url
                  }
                }
                user_upvoters {
                  username
                }
                followers {
                  username
                }
                featured
                slug
              }
    					categories {
                id
                name
                location {
                  id
                  name
                }
                category {
                  id
                  name
                }
              }
            }
          }
          `,
      })
      .catch((err) => {
        console.log(err);
      });

    /**
     * default user avatar photo: https://www.everypixel.com/image-638397625280524203
     * coolidea photo: Photo by Ameen Fahmy on Unsplash https://unsplash.com/photos/_gEKtyIbRSM
     */
    if (response) {
      this.location = {
        id: response.data.locations[0].id,
        name: response.data.locations[0].name,
        route: response.data.locations[0].route,
        imgSrc: response.data.locations[0].image.url
          ? `http://localhost:1337${response.data.locations[0].image.url}`
          : 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      };

      this.categories = response.data.locations[0].categories;
      if (response.data.locations[0].ideas.length > 0) {
        this.ideas = response.data.locations[0].ideas.map((idea) => {
          return {
            id: idea.id.toString(),
            title: idea.title,
            description: idea.description,
            upvotes: idea.user_upvoters.length,
            ideaCreator: idea.user_creator.username,
            // temporarily use this now as localhost photos are hit/miss
            src: idea.images.length
              ? `http://localhost:1337${idea.images[0].url}`
              : 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
            volunteers: idea.volunteers.length,
            // TODO fix API to return donated amount
            amountReceived: 100,
            followers: idea.followers.length,
            // temporarily use this now as localhost photos are hit/miss
            user_avatar: idea.user_creator.avatar
              ? `http://localhost:1337${idea.user_creator.avatar.url}`
              : 'https://www.everypixel.com/image-638397625280524203.jpg',
            featured: idea.featured,
          };
        });
      } else {
        return {
          ideas: this.$store.getters['ideas/getIdeas'],
        };
      }
    }
  },
};
</script>
