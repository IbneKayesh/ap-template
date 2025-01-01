const Component = {
    create(tag, attributes = {}, content = "") {
        return $(`<${tag}>`).attr(attributes).html(content);
    }
};