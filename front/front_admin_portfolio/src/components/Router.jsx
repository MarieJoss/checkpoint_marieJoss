import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import InnerContact from "./contact/Contact";
import ListProjets from "./projet/ListProjets";
import InnerDashboard from "./dashboard/InnerDashboard";
import InnerArticle from "./projet/InnerArticle";
import ModifInfos from "./contact/ModifInfos";
import ModifProjet from "./projet/ModifProjet";

export default function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/modifier/:id" component={ModifProjet} />
        <Route path="/settings/:id" component={ModifInfos} />
        <Route path="/contact" component={InnerContact} />
        <Route path="/article" component={InnerArticle} />
        <Route path="/projets" component={ListProjets} />
        <Route exact path="/" component={InnerDashboard} />
      </Switch>
    </BrowserRouter>
  );
}
