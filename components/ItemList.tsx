import { Grid, Image } from 'semantic-ui-react'
import styles from "../styles/ListItem.module.css";
export default function ItemList({list} : any){
    console.log("리스트 "+ JSON.stringify(list))
    return(
        <>
            <Grid columns={3} divided>
                <Grid.Row>
                    {list.map((item : any)=>(
                            <Grid.Column>
                                <div className={styles.itemDataBox}>
                                    <Image className={styles.img_item} src={item.image_link} height={100}
                                           width={100} alt={item.name} />
                                    <strong className={styles.tit_item}>{item.name}</strong>
                                    <span className={styles.txt_info}>
                                        {item.category} {item.product_type}
                                    </span>
                                    <strong className={styles.num_price}>{item.price}</strong>
                                </div>

                            </Grid.Column>
                        )
                    )}
                </Grid.Row>
            </Grid>
        </>
    )
}