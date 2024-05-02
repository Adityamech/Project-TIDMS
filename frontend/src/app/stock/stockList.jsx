import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Stock = () => {
  const StockData = [
    {
      title: "GRADE 1",
      count: 10,
      link: "/stock/Grades/Grade1",
      image: "/Leaf.png"
    },
    {
      title: "GRADE 2",
      count: 10,
      link: "/stock/Grades/Grade2",
      image: "/Leaf.png"
    },
    {
      title: "GRADE 3",
      count: 10,
      link: "/stock/Grades/Grade3",
      image: "/Leaf.png"
    },
    {
      title: "GRADE 4",
      count: 10,
      link: "/stock/Grades/Grade4",
      image: "/Leaf.png"
    },
    {
      title: "GRADE 5",
      count: 10,
      link: "/stock/Grades/Grade5",
      image: "/Leaf.png"
    },
    {
      title: "GRADE 6",
      count: 10,
      link: "/stock/Grades/Grade6",
      image: "/Leaf.png"
    },
    {
      title: "GRADE 7",
      count: 10,
      link: "/stock/Grades/Grade7",
      image: "/Leaf.png"
    },
    {
      title: "GRADE 8",
      count: 10,
      link: "/stock/Grades/Grade8",
      image: "/Leaf.png"
    },
  ];

  return (
    <Grid container spacing={3} justifyContent="center">
      {StockData.map((Stock, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Link href={Stock.link} passHref>
            <Card sx={{ height: '220px', width: '300px', position: 'relative', background: 'linear-gradient(to top right, #CFDEB1, #F2F7E7)', textDecoration: 'none', cursor: 'pointer' }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div>
                    <div>
                      <Image src={Stock.image} alt="" width={135} height={160} style={{ display: 'block', marginTop: '85px',marginLeft:"165px",position:"relative" }} />
                    </div>
                  </div>
                  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', borderRadius: '15px', padding: '5px 10px' }}>
                    <Typography variant="h6" sx={{ textAlign: 'center', margin: 0 }}>
                      {Stock.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" component="p" sx={{marginTop:"-250px", position:"relative", color:'#588158'}}> Total:
                     {Stock.count}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Stock;
