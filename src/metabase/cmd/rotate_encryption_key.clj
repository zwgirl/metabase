(ns metabase.cmd.rotate-encryption-key
  (:require [cheshire.core :as json]
            [clojure.java.jdbc :as jdbc]
            [environ.core :as env]
            [metabase.db :as mdb]
            [metabase.db.connection :as mdb.conn]
            [metabase.models :refer [Database Setting]]
            [metabase.util.encryption :as encrypt]
            [toucan.db :as db]))

(defn rotate-keys! [to-key]
  "Rotate the current configured db using the current MB_ENCRYPTION_SECRET_KEY env var and `to-key` argument."
  (mdb/setup-db!)
  (let [hashed-key (encrypt/secret-key->hash to-key)]
    (db/transaction
      (try
        (doseq [[key value] (db/select-field->field :key :value Setting)]
          (println "key:" key "  value: " value ". encrypted: " (encrypt/maybe-encrypt hashed-key value))
          (when (encrypt/possibly-encrypted-string? value)
            (throw "foo"))
          (jdbc/update! (mdb.conn/jdbc-spec)
                        :setting
                        {:value (encrypt/maybe-encrypt hashed-key value)}
                        ["key = ?" key]))
        (doseq [[id details] (db/select-id->field :details Database)]
          (println details)
          (jdbc/update! (mdb.conn/jdbc-spec)
                        :metabase_database
                        {:details (encrypt/maybe-encrypt hashed-key (json/encode details))}
                        ["id = ?" id]))
        (catch Throwable e
          (println "MB_ENCRYPTION_SECRET_KEY does not correcty decrypt files"))))))
