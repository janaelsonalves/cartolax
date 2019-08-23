import React, { Component } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

class Cartola extends Component {
  state = {
    atletas: [],
    clubes: {},
    posicoes: {},
    status: {},
    loading: false,
    error: ""
  };

  componentDidMount() {
    Axios.get("/api/atletas/mercado")
      .then(res => {
        this.setState({ loading: true });
        this.setState({
          atletas: res.data.atletas,
          clubes: res.data.clubes,
          posicoes: res.data.posicoes,
          status: res.data.status,
          loading: false
        });
      })
      .catch(err => this.setState({ error: err }));
  }

  render() {
    const { atletas, clubes, posicoes, status, loading, error } = this.state;
    console.log(atletas, loading);
    return (
      <div>
        <h1>Cartola</h1>
        {loading || error ? (
          <div>Loading data + {error}</div>
        ) : (
          // <div>
          //   {atletas.map(atleta => (
          //     <div key={atleta.atleta_id}>
          //       {atleta.apelido} /
          //       {posicoes[atleta.posicao_id].abreviacao.toUpperCase()}/
          //       {status[atleta.status_id].nome}/
          //       {(atleta.jogos_num * atleta.pontos_num).toFixed(2)}
          //     </div>
          //   ))}
          // </div>
          <ItemsList {...this.state} />
        )}
      </div>
    );
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

function ItemsList(props) {
  const classes = useStyles();
  const { atletas, clubes, posicoes, status, loading, error } = props;
  return (
    <List className={classes.root}>
      {atletas.map(atleta => (
        <div>
          <ListItem key={atleta.atleta_id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={
                  atleta.foto ? atleta.foto.replace(/FORMATO/i, "80x80") : ""
                }
              />
            </ListItemAvatar>
            <ListItemText
              primary={atleta.apelido}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {posicoes[atleta.posicao_id].abreviacao.toUpperCase()}/
                    {status[atleta.status_id].nome}
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
}

export default Cartola;
