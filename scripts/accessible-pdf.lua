-- Tagged-PDF LaTeX currently fails on multi-page longtable output. For the PDF
-- only, preserve each table's header/value relationships as a linear list that
-- works predictably for screen readers and narrow visual layouts.
function Table(table)
  local headers = {}
  local header_row = table.head.rows[1]
  if header_row then
    for index, cell in ipairs(header_row.cells) do
      headers[index] = pandoc.utils.stringify(cell)
    end
  end

  local items = {}
  for _, body in ipairs(table.bodies) do
    for _, row in ipairs(body.body) do
      local fields = {}
      for index, cell in ipairs(row.cells) do
        local label = headers[index] or ("Column " .. index)
        fields[#fields + 1] = pandoc.Para({
          pandoc.Strong({pandoc.Str(label .. ":")}),
          pandoc.Space(),
          pandoc.Str(pandoc.utils.stringify(cell))
        })
      end
      items[#items + 1] = fields
    end
  end

  local blocks = {}
  local caption = pandoc.utils.stringify(table.caption)
  if caption ~= "" then
    blocks[#blocks + 1] = pandoc.Para({pandoc.Strong({pandoc.Str(caption)})})
  end
  blocks[#blocks + 1] = pandoc.BulletList(items)
  return pandoc.Div(blocks)
end
