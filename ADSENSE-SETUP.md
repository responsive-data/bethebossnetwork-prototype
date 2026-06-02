# AdSense setup — Be The Boss Network

Your AdSense account is wired into every prototype page. These IDs are public (they appear in `ads.txt` and page source), so it's fine that they're here.

- **Publisher ID:** `pub-9959416972855769`
- **Ad code client ID:** `ca-pub-9959416972855769`

---

## 1) ads.txt — required (proves you own the ad space)

A file named **`ads.txt`** must sit at the **root** of every domain that shows your ads:

- `https://bethebossnetwork.com/ads.txt`
- `https://quiz.bethebossnetwork.com/ads.txt`  ← the funnels

Its one line (already created for you in this folder as `ads.txt`):

```
google.com, pub-9959416972855769, DIRECT, f08c47fec0942fa0
```

Upload that file to the top folder of each live site. Google re-checks it every day or two.

---

## 2) The ad code (already added to the prototype pages)

Every page now loads this one line in its `<head>` — the AdSense **loader**:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9959416972855769" crossorigin="anonymous"></script>
```

Two ways ads then appear:

**A. Auto Ads — whole site, easiest (recommended for the directory, company pages & articles)**
In your AdSense dashboard, turn on **Auto Ads** for `bethebossnetwork.com`. Google then places ads automatically on every page that has the loader. No extra code, no slot IDs.

**B. Manual unit — one ad in an exact spot (best for the funnel questions)**
Create an ad unit in AdSense (**Ads → By ad unit → Display**), copy its **Slot ID**, and place this where the ad should go:

```html
<ins class="adsbygoogle" style="display:block"
     data-ad-client="ca-pub-9959416972855769"
     data-ad-slot="PASTE_SLOT_ID_HERE"
     data-ad-format="auto" data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

---

## 3) To switch ads ON for real (3 steps)

1. In AdSense, **add the site** `bethebossnetwork.com` and wait for approval (one-time).
2. **Upload `ads.txt`** to the live site root(s) — see step 1 above.
3. **Turn on Auto Ads** (covers the whole site) and/or **create the funnel ad unit** and send me its Slot ID so I bake it into the quiz.

---

## Good to know

- Ads only serve on the **approved, live domain**. On this local prototype they stay blank — that's normal, not a bug.
- **Never click your own ads**, and keep genuine content on each page (your quiz questions count) — this is what keeps the account from being suspended.
