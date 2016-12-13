GB Top Ten Predictions
===========

This is the client and server code for a site to gather and score user predictions for Giant Bomb's top 10 games of the year.

Get it running on `localhost:3000`:

```
npm install
npm start
```

Get it running on a production server:

```
¯\_(ツ)_/¯
```

TODO
----

Backend

- [ ] Flesh out submissions endpoint to reject entries after cutoff time
- [x] Add endpoint to return a list for a given username (support multiple usernames?)
- [ ] Add some endpoint for setting the target list to apply scoring (potentially hard-code to a pre-created list to be updated)
- [x] Configure routes to always serve index as the default unless another endpoint is hit

Frontend

- [ ] Create nicer input form for submitting a list (hide once cutoff time arrives)
- [x] Set up routes to allow viewing a list of another person
- [ ] Build UI for displaying a list (scored and unscored)
- [ ] Build UI for comparing lists between two users (scored and unscored)
- [ ] Create color scheme and styles to make the site not look like butt