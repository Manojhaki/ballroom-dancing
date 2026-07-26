Drop image files here (jpg, png, webp, svg, etc.).

Anything in `public/` is served as-is from the site root — no import needed.
An image at `public/images/photo.jpg` is reachable at `/images/photo.jpg`,
so reference it directly:

```tsx
<img src="/images/photo.jpg" alt="..." />
```

Delete this file once real images are added — it only exists so the empty
folder survives in git.
