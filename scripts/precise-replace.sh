#!/bin/bash

# Read all CDN URLs
mapfile -t urls < /tmp/cdn_urls.txt

# Create sed replacement script
> /tmp/sed_script.txt

counter=1
for url in "${urls[@]}"; do
  # Escape special characters for sed
  escaped_url=$(printf '%s\n' "$url" | sed -e 's/[\/&]/\\&/g')
  local_path="/images/img-${counter}.jpg"
  
  echo "s|$escaped_url|$local_path|g" >> /tmp/sed_script.txt
  echo "URL $counter: $local_path"
  
  counter=$((counter + 1))
done

# Apply replacements to each file
for file in /home/ubuntu/oxec-immigration/client/src/pages/{Home,BusinessClass,FamilyClass,Temporary,SkillWorker}.tsx; do
  if [ -f "$file" ]; then
    sed -i -f /tmp/sed_script.txt "$file"
    echo "✓ Updated: $(basename $file)"
  fi
done

echo "✅ All CDN URLs replaced successfully"
