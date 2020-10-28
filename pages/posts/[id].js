import Layout from "../../components/layout";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

// memo なんでpostData入る？仕様？
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {/* divタグの中にcontentHtmlを入れ込んでいる */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

//[id]ではどんなページを表示する可能性があるか判断
// どんなidを持つ配列なのかがreturnされる
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false, //falseにすると適当なパスに飛んだら404が表示される
  };
}

// getStaticPathsのidに基づいたデータをfetch
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
