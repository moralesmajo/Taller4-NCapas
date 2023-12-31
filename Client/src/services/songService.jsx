import axios from "axios";

export const getSongs = async (token) => {
  try {
    const response = await axios.get(`/song/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Check if the HTTP response is successful
    if (response.status === 200) {
      // The response data is already in JSON format
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
}

export const getPlaylist = async (token) => {
  try {
    const response = await axios.get(`/user/playlist`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Check if the HTTP response is successful
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
}

export const getPlaylistbyID = async (token, playlistCode) => {
  try {
    const response = await axios.get(`/playlist/?playlistCode=${playlistCode}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Check if the HTTP response is successful
    if (response.status === 200) {
      // The response data is already in JSON format
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
}

export const addSongToPlaylist = async (token, playlistCode, songCode) => {
  try {
    const response = await axios.post(`/playlist/?playlistCode=${playlistCode}`,
      {
        codeSong: songCode
      }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Check if the HTTP response is successful
    if (response.status === 200) {
      // The response data is already in JSON format
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
}

export const deletePlaylist = async (token, playlistCode) => {
  try {
    const response = await axios.delete(`/playlist/delete?playlistCode=${playlistCode}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Check if the HTTP response is successful
    if (response.status === 200) {
      // The response data is already in JSON format
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
}

export const deleteSongFromPlaylist = async (token, playlistCode, songCode) => {
  try {
    const response = await axios.delete(`/playlist/song/delete?playlistCode=${playlistCode}&songCode=${songCode}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Check if the HTTP response is successful
    if (response.status === 200) {
      // The response data is already in JSON format
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
}

export const createPlaylist = async (token, title, description) => {
  try {
    const response = await axios.post(`/playlist`, {
      title: title,
      description: description,
    }, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response;
      return data;
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.error("Playlist already exists:", error.response.data);
      throw new Error("Ya existe una playlist con este nombre");
    } else {
      // Handle other errors
      console.error("An error occurred:", error);
      throw error;
    }
  }
}