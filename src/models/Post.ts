export class Post {
  constructor(
    private id: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string,
    private creator: {
      id: string;
      name: string;
    }
  ) {}
  public getId(): string {
    return this.id;
  }
  public getContent(): string {
    return this.content;
  }
  public getLikes(): number {
    return this.likes;
  }
  public getDislikes(): number {
    return this.dislikes;
  }
  public getCreatedAt(): string {
    return this.createdAt;
  }
  public getUpdatedAt(): string {
    return this.updatedAt;
  }
  public getCreator() {
    return this.creator;
  }
  public setId(newId: string): void {
    this.id = newId;
  }
  public setContent(newContent: string): void {
    this.content = newContent;
  }
  public setLikes(newLikes: number): void {
    this.likes = newLikes;
  }
  public setDislikes(newDislikes: number): void {
    this.dislikes = newDislikes;
  }
  public setUpdatedAt(newUpdatedAt: string): void {
    this.updatedAt = newUpdatedAt;
  }
  public setCreator(object: { id: string; name: string }): void {
    this.creator = object;
  }
}
