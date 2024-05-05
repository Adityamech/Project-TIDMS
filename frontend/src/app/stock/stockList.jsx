import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Stock = () => {
  const StockData = [
    {
      title: "GRADE 1",
      link: "/stock/Grades/Grade1",
      image: "/Leaf.png"
    },
    {
      title: "GRADE 2",
      link: "/stock/Grades/Grade2",
      image: "/Leaf.png"
    },
    {
      title: "GRADE 3",
      link: "/stock/Grades/Grade3",
      image: "/Leaf.png"
    },
    {
      title: "GRADE 4",
      link: "/stock/Grades/Grade4",
      image: "/Leaf.png"
    },
    {
      title: "GRADE 5",
      link: "/stock/Grades/Grade5",
      image: "/Leaf.png"
    },
    {
      title: "GRADE 6",
      link: "/stock/Grades/Grade6",
      image: "/Leaf.png"
    },
    {
      title: "GRADE 7",
      link: "/stock/Grades/Grade7",
      image: "/Leaf.png"
    },
    {
      title: "GREEN TEA",
      link: "/stock/Grades/GreenTea",
      image: "/Leaf.png"
    },
  ];

  return (
    <Grid container spacing={3} justifyContent="center">
      {StockData.map((stockItem, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <Link href={stockItem.link} passHref>
            <Card sx={{ height: '100%', width: '100%', position: 'relative', background: 'linear-gradient(to top right, #CFDEB1, #F2F7E7)', textDecoration: 'none', cursor: 'pointer' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Box sx={{ position: 'relative', width: '100%', height: '150px' }}>
                  <Image src={stockItem.image} alt="" layout="fill" objectFit="contain" style={{marginTop:'-30px'}} />
                </Box>
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', padding: '10px 0' }}>
                  <Typography variant="h6">{stockItem.title}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Stock;
