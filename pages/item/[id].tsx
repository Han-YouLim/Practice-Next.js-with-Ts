import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import {Button, Image, Header, Loader,Dimmer,  Segment} from "semantic-ui-react";
import Head from "next/head";
import styles from "../../styles/ListItem.module.css";
import Link from "next/link";
import { GetServerSideProps } from "next"
//dynamic router 는 어떤 값이 들어오냐에 따라 달라지기 때문에, ssr을 추천
//단 들어올 값을 아는 경우는 정적생성이 가능
//SSR
export async function getServerSideProps(context: { params: any; }) {
    const id = context.params.id
    console.log("id"+ id)
    const API_URL =
        `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
    const res = await fetch(API_URL);
    console.log("what is r" + JSON.stringify(res))
    const data = await res.json()
    return {
        props: {
            item: data
        }
    }
}

const ItemPage = ({ item }: any) => {
    // const [item, setItem] = useState({
    //     image_link: undefined,
    //     name: undefined,
    //     price:undefined,
    //     description:undefined,
    //     product_type:undefined,
    //     category:undefined
    // })
    console.log("what is r" + JSON.stringify(item))
    console.log("what is id" + item.id)
    return(
        <>
            {item && (<><div className={styles.container}>
                <Head>
                    <title>Item | {item.name}</title>
                    {/*메타데이터 설정 시, 검색 엔진이나 공유할때 이 정보를 사용 할 수있음 */}
                    {/*--> SEO, 공유 등에 사용 가능/ 데이터 변환했을 때 바로 바로 반영 가능*/}
                    <meta name="description" content={item.description}></meta>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div>
                    <Image className={styles.img_item} src={item.image_link} alt={item.name} height={150}
                           width={150}/>
                </div>
                <div className={styles.info_item}>
                    <h3 className={styles.tit_item}>{item.name}</h3>
                    <span className={styles.txt_info}>
                        {item.category ? `${item.category}/` : ""}
                        {item.product_type}
                    </span>
                    <h1 className={styles.num_price}>$ {item.price}</h1>
                    <button className={styles.getButton}>구매하기</button>
                </div>
            </div>
                <div className={styles.description}>
                <Header as="h3">Description</Header>
                <h5>{item.description}</h5>
                </div>
                <div className={styles.backToHome}>
                <Link href="/">
                <a>← Back to home</a>
                </Link>
                </div></>
            )
            }

        </>
    )
}

export default ItemPage;