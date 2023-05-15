import { Grid } from "@mui/material"

export const OfferCard = ({ offer }) => {
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <div className="bg-img offer-area max-w-[500px] h-[100px] rounded-2xl mb-10 cursor-pointer">

      </div>
      <style jsx>{
        `
            .bg-img{
              background-image:url(${offer.imageWeb});
              padding:5rem 0rem;
            }
            .offer-area{
              position:relative;
              z-index:1;
              background-position:50%;
              background-size:cover;
              background-repeat:no-repeat;
            }

            `
      }
      </style>
    </Grid>
  )
}
