import { getTranslation } from '@/lib/i18n';


export const getBlogData = (currentLocale: string) => ({
  featuredPost: {
    id: 1,
    slug: "building-future-pycon-senegambia-shaping-west-africa-tech-landscape",
    title: getTranslation(currentLocale, 'blog.featured_post_title'),
    excerpt: getTranslation(currentLocale, 'blog.featured_post_excerpt'),
    author: "Sheriff Gaye",
    authorRole: getTranslation(currentLocale, 'blog.featured_post_author_role'),
    date: getTranslation(currentLocale, 'blog.featured_post_date'),
    readTime: getTranslation(currentLocale, 'blog.featured_post_read_time'),
    category: getTranslation(currentLocale, 'blog.featured_post_category'),
    image: "/images/IMG_1696.jpeg",
    views: 7,
    comments: 3,
    featured: true,
    tags: [
      getTranslation(currentLocale, 'blog.featured_post_tag_1'),
      getTranslation(currentLocale, 'blog.featured_post_tag_2'),
      getTranslation(currentLocale, 'blog.featured_post_tag_3'),
      getTranslation(currentLocale, 'blog.featured_post_tag_4')
    ]
  },
  blogPosts: [
    {
      id: 2,
      slug: "getting-started-django-west-african-developer-guide",
      title: getTranslation(currentLocale, 'blog.post_1_title'),
      excerpt: getTranslation(currentLocale, 'blog.post_1_excerpt'),
      author: "Sheriff Gaye",
      date: getTranslation(currentLocale, 'blog.post_1_date'),
      readTime: getTranslation(currentLocale, 'blog.post_1_read_time'),
      category: getTranslation(currentLocale, 'blog.post_1_category'),
      image: "/images/IMG_7567.jpeg",
      views: 4,
      comments: 5,
      tags: [
        getTranslation(currentLocale, 'blog.post_1_tag_1'),
        getTranslation(currentLocale, 'blog.post_1_tag_2'),
        getTranslation(currentLocale, 'blog.post_1_tag_3')
      ]
    },
    {
      id: 3,
      slug: "python-agriculture-smart-farming-solutions-senegambia",
      title: getTranslation(currentLocale, 'blog.post_2_title'),
      excerpt: getTranslation(currentLocale, 'blog.post_2_excerpt'),
      author: "Sheriff Gaye",
      date: getTranslation(currentLocale, 'blog.post_2_date'),
      readTime: getTranslation(currentLocale, 'blog.post_2_read_time'),
      category: getTranslation(currentLocale, 'blog.post_2_category'),
      image: "/images/IMG_8071.jpeg",
      views: 7,
      comments: 5,
      tags: [
        getTranslation(currentLocale, 'blog.post_2_tag_1'),
        getTranslation(currentLocale, 'blog.post_2_tag_2'),
        getTranslation(currentLocale, 'blog.post_2_tag_3')
      ]
    },
    {
      id: 4,
      slug: "meet-keynote-speakers-visionaries-leading-python-innovation",
      title: getTranslation(currentLocale, 'blog.post_3_title'),
      excerpt: getTranslation(currentLocale, 'blog.post_3_excerpt'),
      author: "Sheriff Gaye",
      date: getTranslation(currentLocale, 'blog.post_3_date'),
      readTime: getTranslation(currentLocale, 'blog.post_3_read_time'),
      category: getTranslation(currentLocale, 'blog.post_3_category'),
      image: "/images/test.jpg",
      views: 7,
      comments: 8,
      tags: [
        getTranslation(currentLocale, 'blog.post_3_tag_1'),
        getTranslation(currentLocale, 'blog.post_3_tag_2'),
        getTranslation(currentLocale, 'blog.post_3_tag_3')
      ]
    },
    {
      id: 5,
      slug: "building-apis-fastapi-performance-meets-simplicity",
      title: getTranslation(currentLocale, 'blog.post_4_title'),
      excerpt: getTranslation(currentLocale, 'blog.post_4_excerpt'),
      author: "Sheriff Gaye",
      date: getTranslation(currentLocale, 'blog.post_4_date'),
      readTime: getTranslation(currentLocale, 'blog.post_4_read_time'),
      category: getTranslation(currentLocale, 'blog.post_4_category'),
      image: "/images/side-shot-code-editor-using-react-js.jpg",
      views: 3,
      comments: 19,
      tags: [
        getTranslation(currentLocale, 'blog.post_4_tag_1'),
        getTranslation(currentLocale, 'blog.post_4_tag_2'),
        getTranslation(currentLocale, 'blog.post_4_tag_3')
      ]
    },
    {
      id: 6,
      slug: "women-tech-celebrating-female-python-developers-senegambia",
      title: getTranslation(currentLocale, 'blog.post_5_title'),
      excerpt: getTranslation(currentLocale, 'blog.post_5_excerpt'),
      author: "Sheriff Gaye",
      date: getTranslation(currentLocale, 'blog.post_5_date'),
      readTime: getTranslation(currentLocale, 'blog.post_5_read_time'),
      category: getTranslation(currentLocale, 'blog.post_5_category'),
      image: "/images/african-american-it-professional-managing-ai-system-machine-learning.jpg",
      views: 16,
      comments: 4,
      tags: [
        getTranslation(currentLocale, 'blog.post_5_tag_1'),
        getTranslation(currentLocale, 'blog.post_5_tag_2'),
        getTranslation(currentLocale, 'blog.post_5_tag_3')
      ]
    },
    {
      id: 7,
      slug: "data-science-social-good-python-projects-making-difference",
      title: getTranslation(currentLocale, 'blog.post_6_title'),
      excerpt: getTranslation(currentLocale, 'blog.post_6_excerpt'),
      author: "Sheriff Gaye",
      date: getTranslation(currentLocale, 'blog.post_6_date'),
      readTime: getTranslation(currentLocale, 'blog.post_6_read_time'),
      category: getTranslation(currentLocale, 'blog.post_6_category'),
      image: "/images/IMG_1696.jpeg",
      views: 2,
      comments: 1,
      tags: [
        getTranslation(currentLocale, 'blog.post_6_tag_1'),
        getTranslation(currentLocale, 'blog.post_6_tag_2'),
        getTranslation(currentLocale, 'blog.post_6_tag_3')
      ]
    }
  ]
});