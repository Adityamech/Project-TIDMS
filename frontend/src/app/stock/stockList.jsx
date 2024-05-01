import { Grid, Card, CardContent, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Livestock = () => {
  const livestockData = [
    {
      title: "Total Boar",
      count: 10,
      link: "/livestock/totalboar",
      addButtonLabel: "Add Boar",
      addButtonLink: "/livestock/addboar",
      image: "/group.svg"
    },
    {
      title: "Total Sow",
      count: 15,
      link: "/livestock/totalsow",
      addButtonLabel: "Add Sow",
      addButtonLink: "/livestock/addsow",
      image: "/group.svg"
    },
    {
      title: "Total Piglets",
      count: 20,
      link: "/livestock/totalpiglet",
      addButtonLabel: "Add Piglets",
      addButtonLink: "/livestock/addpiglets",
      image: "/group.svg"
    },
    {
      title: "Total Khassi",
      count: 5,
      link: "/livestock/totalkhassi",
      addButtonLabel: "Add Khassi",
      addButtonLink: "/livestock/addkhassi",
      image: "/group.svg"
    }
  ];

  return (
    <Grid container spacing={3} justifyContent="center">
      {livestockData.map((livestock, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Card sx={{ height: '220px', width: '260px', position: 'relative',backgroundColor:"90EE90" }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="logos">
                  <div className="pig-logo">
                    <Image src={livestock.image} alt="" width={100} height={150} style={{ display: 'block', marginTop: '-50px',marginLeft:"40px",position:"relative" }} />
                  </div>
                </div>
                <Typography variant="h6" component="h2">
                  <Link href={livestock.link}>
                    {livestock.title}
                  </Link>
                </Typography>
                <Typography variant="body2" component="p" sx={{marginTop:"-250px", position:"absolute"}}>
                  {livestock.count}
                </Typography>
              </div>
              <Link href={livestock.addButtonLink}>
                <Button  variant="contained" size="small" sx={{}}>{livestock.addButtonLabel}</Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Livestock;
