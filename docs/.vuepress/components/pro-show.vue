<template>
  <div class="theme-example">
    <div class="blog-list-wrapper">
      <Card class="blog-item" v-for="(blog, index) in currentPageData" :key="blog.name">
        <template slot="front">
          <img class="thumbnail" :src="blog.thumbnail" alt="缩略图">
        </template>
        <template slot="back">
          <div class="info">
            <h4 class="title">{{ blog.name }}</h4>
            <p class="desc">{{ blog.desc }}</p>
            <a v-if="!blog.link" class="btn inner" :href="`javascript:;`">内部上线 / 涉及法律 / 不可查看</a>
            <a v-if="blog.link" class="btn" target="blank" :href="blog.link">网站直达</a>
            <a v-if="blog.git" class="btn" target="blank" :href="blog.git">Git地址</a>
            <a v-if="blog.docs" class="btn" target="blank" :href="blog.docs">开发文档</a>
          </div>
        </template>
      </Card>
    </div>

    <!-- 分页 -->
    <pagation
      class="pagation"
      :total="examplesData.length"
      :currentPage="currentPage"
      :perPage="9"
      @getCurrentPage="getCurrentPage"
    ></pagation>
  </div>
</template>

<script>
import examplesData from '../data/projectsData'
export default {
  data () {
    return {
      examplesData,
      currentPage: 1
    }
  },
  computed: {
    currentPageData () {
      const start = (this.currentPage - 1) * 9
      const end = this.currentPage * 9
      return this.examplesData.slice(start, end)
    }
  },
  methods: {
    getCurrentPage (currentPage) {
      this.currentPage = currentPage
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    }
  }
}
</script>


<style lang="stylus" scoped>
.theme-example
  .blog-list-wrapper
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .blog-item
      margin-bottom 4rem
      width 31%
      height 140px
      transition: all .5s;
      .info
        box-sizing border-box
        padding 1rem 1rem
        .title
          margin 0
          max-width 65%
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .desc
          margin .6rem 0 1.5rem
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          font-size 12px
        .btn
          display inline-block
          background-color $accentColor  
          color #ffffff
          border-radius 2px
          padding 2px 5px
          font-size 12px
          text-decoration none 
          cursor pointer
        .inner
          color #00ffff
@media (max-width: $MQMobile)
  .theme-example
    .blog-list-wrapper
      .blog-item
        width 100%
</style>