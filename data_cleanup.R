library(dplyr)

rawdata1 <- read.csv("Desktop/Parsons/Studio1/Mid-term/objects.csv")
rawdata2 <- read.csv("Desktop/Parsons/Studio1/Mid-term/locations.csv")
rawdata3 <- read.csv("Desktop/Parsons/Studio1/Mid-term/published_images.csv")

locations <- rawdata2 %>% 
  filter(site == 'West Building')

#joined_data <- inner_join(locations, count_objects, by = "locationid")

objects <- rawdata1 %>% 
  select(objectid, locationid, title,attribution )

artist_na_counts <- table(objects$attribution, is.na(objects$locationid))

result_table <- objects %>%
  group_by(attribution) %>%
  summarize(
    Total_Count = n(),               # Total count of the same artist name
    NA_Count = sum(is.na(locationid))) %>%
    mutate(difference = Total_Count - NA_Count) %>%
  filter(difference >= 5)

objects_updated <- left_join(objects, result_table, by = "attribution") %>% 
  filter(!is.na(difference))

objects_locations <- left_join(objects_updated, locations, by = "locationid")

images <- rawdata3 %>% 
  filter (viewtype=="primary") %>% 
  select(iiifthumburl,depictstmsobjectid)  %>% 
  rename(locationid = depictstmsobjectid)


final_table <- left_join(objects_locations, images, by = "locationid"))


write.csv(final_table, "Desktop/Parsons/Studio1/finals/final_table.csv")

