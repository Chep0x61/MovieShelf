import Content from "../models/content";

export default class ContentService {
    static getContents(): Promise<Content[]> {
        return fetch('http://localhost:3001/contents')
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

    static getContent(id: number): Promise<Content|null> {
        return fetch(`http://localhost:3001/contents/${id}`)
          .then(response => response.json())
          .then(data => this.isEmpty(data) ? null : data)
          .catch(error => this.handleError(error));
      }
    
    static addContent(content: Content): Promise<Content> {
      return fetch(`http://localhost:3001/contents`, {
        method: 'POST',
        body: JSON.stringify(content),
        headers: {'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }

    static deleteContent(content: Content): Promise<Content> {
      return fetch(`http://localhost:3001/contents/${content.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application.json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }

    static updateContent(content: Content): Promise<Content> {
      return fetch(`http://localhost:3001/contents/${content.id}`, {
        method: 'PUT',
        body: JSON.stringify(content),
        headers: {'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }

    static isEmpty(data: Object): boolean {
      return Object.keys(data).length === 0;
    }

    static handleError(error: Error): void {
        console.error(error);
    }
}