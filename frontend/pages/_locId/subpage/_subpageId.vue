<template>
  <div>
    <section class="item-contain">
      <h1 style="font-size: 50px">{{ subPageData.title }}</h1>
    </section>
    <hr />
    <section id="contentWrap" class="page-contents"></section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.subpageId,
      subPageData: {
        title: '',
        content: '',
      },
    };
  },
  async mounted() {
    const subpageResponse = await this.$axios
      .get(`/sub-pages?location.route=${this.$route.params.locId}`)
      .catch((error) => {
        console.log(error);
      });
    if (subpageResponse) {
      let i;
      for (i = 0; i < subpageResponse.data.length; i++) {
        if (
          subpageResponse.data[i].title.toLowerCase() === this.id.toLowerCase()
        ) {
          this.subPageData.title = subpageResponse.data[i].title;
          this.subPageData.content = subpageResponse.data[i].content;
          const md = require('markdown-it')();
          md.set({
            html: true,
          });

          const result = md.render(subpageResponse.data[i].content);
          const div = document.getElementById('contentWrap');
          if (div) {
            if (div.outerHTML)
              div.outerHTML = '<pre id="test">' + result + '</pre>';
            else div.innerHTML = result;
          }
          return;
        }
      }
    }
    this.subPageData.title = '404 Page Not Found';
  },
};
</script>

<style lang="scss" scoped>
.item-contain {
  margin-left: 8%;
  width: 80%;
  display: grid;
  justify-content: space-around;
  grid-template-columns: 1fr 2fr;
}

.page-contents {
  margin-left: 8%;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  word-wrap: break-word;
  grid-template-columns: 1fr 2fr;
}

input {
  width: 60px;
  font-size: 25px;
  margin: 0 10px;
  padding: 5px 10px;
}

.update-num {
  background: black;
  border-color: black;
  color: white;
  font-size: 20px;
  width: 45px;
}

.quantity {
  display: flex;
}
</style>
