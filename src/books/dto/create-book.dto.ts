export class CreateBookDto {
  title: string;
  category: string;
  author: string;
  description: string;
  coverImageUrl: string;
  keywords: string[];
  instances: number;
}
