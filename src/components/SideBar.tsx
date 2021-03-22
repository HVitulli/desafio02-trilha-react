import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

interface SideBarProps {
  getSelectedGenreId: number;
  getGenreId: (id: number) => void;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({ getGenreId, getSelectedGenreId}: SideBarProps) {
  // Complete aqui
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => getGenreId(genre.id)}
            selected={getSelectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}