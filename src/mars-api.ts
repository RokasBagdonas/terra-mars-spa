// @ts-nocheck
import axios from "axios";
import {SERVER_IP} from "../deployment.config.js";
import auth from "./main";

const ROOT_URL = `${SERVER_IP}:8000/mars_api/`;
export default ROOT_URL;

const ENDPOINTS = {
  "games": "games/",
  "players": "players/",
  "player_scores": "player_scores/",
  "player_stats": "player_stats/",
  "game_scores": "game_scores/",
  "calc_player_stats": "player_stats/calc",
  "corporations": "corporations",
  "maps": "maps",
}

export const GAME_SCHEMA = {
  Id: "id",
  "Player #": "player_count",
  Date: "date",
  Map: "game_map",
  "Gen #": "number_of_generations",
  Draft: "draft",
  Prelude: "prelude",
  "Venus Next": "venus_next",
  Colonies: "colonies",

}

export const PLAYER_SCORE_SCHEMA = {
  player: "Player", //player object
  corporation: "Corporation",
  terraform_rating: "TR",
  milestones: "Milestones",
  awards: "Awards",
  greeneries: "Greeneries",
  cities: "Cities",
  event_cards: "Events",
  automated_cards: "Automoated cards",
  active_cards: "Active cards",
  resources: "Resources",
  total_score: "Final Score",
  is_winner: "Won?",
  id: "score_id",
  game_id: "game_id"
};


export function getGames(limit = 50, offset = 0, order_by = "-date") {
  return axios.get(ROOT_URL + ENDPOINTS["games"], {
    params: {
      limit: limit,
      offset: offset,
      ordering: order_by,
    },
    headers: {Authorization: `Bearer ${auth.getAuthToken()}`},
  })
}

export function getGameScores(id) {
  return axios.get(ROOT_URL + ENDPOINTS["game_scores"] + id,
    {headers: {Authorization: `Bearer ${auth.getAuthToken()}`}, });
}

export async function getPlayers() {
  return axios.get(ROOT_URL + ENDPOINTS["players"],
    {headers: {Authorization: `Bearer ${auth.getAuthToken()}`}, });
}


export async function getMaps() {
  return await axios.get(ROOT_URL + ENDPOINTS["maps"],
    {headers: {Authorization: `Bearer ${auth.getAuthToken()}`}, });
}

export async function getCorporations() {
  return await axios.get(ROOT_URL + ENDPOINTS["corporations"],
    {headers: {Authorization: `Bearer ${auth.getAuthToken()}`}, });
}

export function postGameScores(payload: String) {
  console.log("postGameScores");
  return axios({
    url: ROOT_URL + ENDPOINTS["game_scores"], data: payload, method: "post", headers:
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.getAuthToken()}`
    }
  })
}

// PlayerStats ================================================================
export async function getPlayersStats(){
  return await axios.get(ROOT_URL + ENDPOINTS["player_stats"],
    {headers: {Authorization: `Bearer ${auth.getAuthToken()}`}, });
}

export async function calcPlayerStats(player_id: String){
  return await axios.get(ROOT_URL + ENDPOINTS["calc_player_stats"],
    {
      params:  {player_id: player_id},
      headers: {Authorization: `Bearer ${auth.getAuthToken()}`}, });
}
